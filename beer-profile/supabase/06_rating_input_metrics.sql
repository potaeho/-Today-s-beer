-- ================================================
-- 오늘의 맥주 (OMAC) — 평가 입력 화면 인터랙션 집계
-- ================================================
-- InputPage(평가 입력)에서 발생하는 세부 행동을 user_events 에 적재한다.
--   screen = 'rating-input'
--   action = tap_reaction | open_hashtag_section | toggle_hashtag
--          | open_flavor_section | adjust_flavor
-- 방문자 식별은 meta->>'visitor_id' (익명).
-- 모든 뷰는 security_invoker=on → anon 조회 불가(행동 데이터 보호).
-- 여러 번 실행해도 안전(idempotent).

-- ── 1. 반응 버튼 (좋아요 / 보통이에요 / 별로예요) ──
-- "어떤 평가를 몇 명이 눌렀나"
create or replace view public.v_rating_reactions
  with (security_invoker = on) as
select
  meta->>'reaction'                    as reaction,        -- 좋아요 / 보통이에요 / 별로예요
  count(*)                             as presses,         -- 누른 총 횟수
  count(distinct meta->>'visitor_id')  as people           -- 누른 사람 수(중복 제거)
from public.user_events
where action = 'tap_reaction'
group by 1
order by people desc;

-- ── 2. 해시태그 선택 ("어떤 점이 좋았나요?") ──────
-- "어떤 태그를 몇 명이 선택했나" (해제는 제외, 선택만 집계)
create or replace view public.v_rating_hashtags
  with (security_invoker = on) as
select
  meta->>'tag_id'                      as tag_id,
  count(*)                             as selects,
  count(distinct meta->>'visitor_id')  as people
from public.user_events
where action = 'toggle_hashtag'
  and meta->>'selected' = 'true'
group by 1
order by people desc;

-- ── 3. 평가 입력 참여 퍼널 (한 줄 요약) ───────────
-- 평가 화면 도달 → 반응 클릭 → 해시태그 선택 → 맛 강도 조작.
-- 각 단계를 "한 번이라도 한" 고유 방문자 수로 집계.
create or replace view public.v_rating_input_engagement
  with (security_invoker = on) as
select
  count(distinct meta->>'visitor_id')
    filter (where action = 'screen_time')           as visited_input,        -- 평가 화면 체류(이탈 시 기록)
  count(distinct meta->>'visitor_id')
    filter (where action = 'tap_reaction')          as pressed_reaction,     -- 반응 버튼 누름
  count(distinct meta->>'visitor_id')
    filter (where action = 'open_hashtag_section')  as opened_hashtags,      -- 해시태그 섹션 펼침
  count(distinct meta->>'visitor_id')
    filter (where action = 'toggle_hashtag'
            and meta->>'selected' = 'true')         as selected_hashtag,     -- 해시태그 실제 선택
  count(distinct meta->>'visitor_id')
    filter (where action = 'open_flavor_section')   as opened_flavor,        -- 맛 강도 섹션 펼침
  count(distinct meta->>'visitor_id')
    filter (where action = 'adjust_flavor')         as adjusted_flavor       -- 맛 강도 실제 조작
from public.user_events
where screen = 'rating-input';
