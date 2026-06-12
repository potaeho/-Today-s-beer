-- ================================================
-- 오늘의 맥주 (OMAC) — WAITLIST (Fake Door Test)
-- "다운로드 하러 가기" 버튼 → 연락처 수집 모달
-- ================================================
-- 목적: 정식 출시 전 수요 검증. 다운로드 의향을 보인
--       사용자의 연락처를 수집해 출시 알림 대상으로 활용.

create table public.waitlist (
  id           uuid primary key default uuid_generate_v4(),
  contact      text not null,                 -- 이메일 또는 전화번호
  contact_type text,                          -- "email" | "phone" (선택한 수단)
  beer_name    text,                          -- 클릭 시점에 보던 맥주 (전환 맥락)
  created_at   timestamptz default now()
);

alter table public.waitlist enable row level security;

-- 비로그인 포함 누구나 신청 가능 (user_events 패턴과 동일)
create policy "누구나 출시 알림 신청 가능"
  on public.waitlist for insert with check (true);

-- ⚠️ SELECT 정책 없음 → anon/authenticated 모두 조회 불가.
--    연락처는 PII이므로 service_role(대시보드/관리자)로만 열람.

create index waitlist_created_idx on public.waitlist(created_at desc);
