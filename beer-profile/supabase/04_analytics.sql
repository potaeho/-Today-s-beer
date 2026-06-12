-- ================================================
-- 오늘의 맥주 (OMAC) — 행동 추적 / 퍼널 분석
-- ================================================
-- user_events 테이블은 schema.sql 에 정의됨 (이미 라이브 존재).
-- 클라이언트는 visitor_id 를 meta->>'visitor_id' 에 담아 보낸다
--   → 테이블 스키마 변경 없이 즉시 적재 가능.
-- 이 파일은 조회 성능 인덱스 + 분석 뷰만 추가한다.
-- 여러 번 실행해도 안전(idempotent).

-- ── 1. 인덱스 ───────────────────────────────────
create index if not exists user_events_session_idx
  on public.user_events(session_id);

-- visitor_id (meta 내부) 함수 기반 인덱스
create index if not exists user_events_visitor_idx
  on public.user_events((meta->>'visitor_id'));

-- ── 2. 다운로드 팝업 퍼널 (일자별) ──────────────
-- 추천 보기 → 다운로드 클릭 → 연락수단 선택 → 입력 → 제출 → 성공.
-- 각 단계 이벤트 수와 이탈(abandon)을 한 줄로 본다.
-- security_invoker: 호출 role 의 RLS 를 따름 → anon 조회 불가(행동 데이터 보호).
create or replace view public.v_download_funnel
  with (security_invoker = on) as
select
  date_trunc('day', created_at)                          as day,
  count(*) filter (where action = 'intro_view')          as intro_view,
  count(*) filter (where action = 'download_click')      as download_click,
  count(*) filter (where action = 'choose_view')         as choose_view,
  count(*) filter (where action = 'pick_contact')        as pick_contact,
  count(*) filter (where action = 'input_view')          as input_view,
  count(*) filter (where action = 'submit')              as submit,
  count(*) filter (where action = 'submit_success')      as submit_success,
  count(*) filter (where action = 'abandon')             as abandon,
  count(distinct meta->>'visitor_id')                    as unique_visitors
from public.user_events
where screen = 'download_popup'
group by 1
order by 1 desc;

-- ── 3. 화면/액션 요약 (어디서 무엇을, 몇 명이) ──
create or replace view public.v_event_summary
  with (security_invoker = on) as
select
  date_trunc('day', created_at)     as day,
  screen,
  action,
  count(*)                          as events,
  count(distinct meta->>'visitor_id') as visitors,
  count(distinct session_id)        as sessions
from public.user_events
group by 1, 2, 3
order by 1 desc, events desc;

-- ── 4. 방문자별 마지막 도달 지점 (이탈 분석) ────
-- 각 방문자가 세션에서 마지막으로 남긴 이벤트 = 이탈 직전 화면/행동.
create or replace view public.v_last_seen
  with (security_invoker = on) as
select distinct on (meta->>'visitor_id', session_id)
  meta->>'visitor_id' as visitor_id,
  session_id,
  screen              as last_screen,
  action              as last_action,
  created_at          as last_at
from public.user_events
order by meta->>'visitor_id', session_id, created_at desc;
