-- ================================================
-- 05. beers 테이블 description_detail 컬럼 추가
-- ================================================
-- BeerContext normalizeBeer()가 b.description_detail을 매핑하고 있으나
-- schema.sql에 해당 컬럼이 누락된 상태. 이 SQL로 추가한다.

alter table public.beers
  add column if not exists description_detail text;
