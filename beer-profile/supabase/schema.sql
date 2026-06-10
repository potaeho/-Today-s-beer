-- ================================================
-- 오늘의 맥주 (OMAC) — Supabase Schema
-- ================================================

-- ── 확장 ──────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ================================================
-- 1. USERS (프로필)
-- ================================================
create table public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text not null,
  handle      text unique not null,          -- @hop_lover
  avatar_url  text,
  bio         text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table public.users enable row level security;

create policy "누구나 프로필 조회 가능"
  on public.users for select using (true);

create policy "본인 프로필만 수정 가능"
  on public.users for update using (auth.uid() = id);

create policy "회원가입 시 프로필 생성"
  on public.users for insert with check (auth.uid() = id);


-- ================================================
-- 2. BEERS (맥주 정보 — 팀 데이터)
-- ================================================
create table public.beers (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  type        text,                          -- India Pale Ale
  category    text not null,                 -- IPA / 라거 / 에일 / 사워 / 스타우트
  abv         text,                          -- "6.5%"
  srm         int,
  srm_color   text,                          -- "#C9A227"
  description text,
  brewery     text,
  origin      text,                          -- 원산지
  tags        text[],                        -- ["#시트러스", "#홉향"]
  hashtags    text[],                        -- ["hop_pine", "sour_citrus"]
  profile     jsonb,                         -- {"단맛":3.8, "쓴맛":4.2, ...}
  image_url   text,
  is_verified boolean default false,         -- 팀 인증 데이터 여부
  created_by  uuid references public.users(id),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table public.beers enable row level security;

create policy "누구나 맥주 조회 가능"
  on public.beers for select using (true);

create policy "인증 유저만 맥주 추가 가능"
  on public.beers for insert with check (auth.role() = 'authenticated');

create index beers_category_idx on public.beers(category);
create index beers_name_idx     on public.beers using gin(to_tsvector('simple', name));


-- ================================================
-- 3. REVIEWS (맥주 평가)
-- ================================================
create table public.reviews (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.users(id) on delete cascade,
  beer_id     uuid not null references public.beers(id) on delete cascade,
  star        numeric(2,1) check (star >= 1 and star <= 5),
  profile     jsonb,                         -- {"단맛":3.8, "쓴맛":4.2, ...}
  hashtags    text[],
  comment     text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  unique(user_id, beer_id)                   -- 맥주당 리뷰 1개
);

alter table public.reviews enable row level security;

create policy "누구나 리뷰 조회 가능"
  on public.reviews for select using (true);

create policy "본인 리뷰만 작성 가능"
  on public.reviews for insert with check (auth.uid() = user_id);

create policy "본인 리뷰만 수정 가능"
  on public.reviews for update using (auth.uid() = user_id);

create policy "본인 리뷰만 삭제 가능"
  on public.reviews for delete using (auth.uid() = user_id);

create index reviews_beer_idx on public.reviews(beer_id);
create index reviews_user_idx on public.reviews(user_id);


-- ================================================
-- 4. POSTS (커뮤니티 게시물)
-- ================================================
create table public.posts (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references public.users(id) on delete cascade,
  content        text,
  beer_id        uuid references public.beers(id) on delete set null,
  likes_count    int default 0,
  comments_count int default 0,
  reposts_count  int default 0,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

alter table public.posts enable row level security;

create policy "누구나 게시물 조회 가능"
  on public.posts for select using (true);

create policy "본인만 게시물 작성 가능"
  on public.posts for insert with check (auth.uid() = user_id);

create policy "본인 게시물만 수정/삭제 가능"
  on public.posts for update using (auth.uid() = user_id);

create policy "본인 게시물만 삭제 가능"
  on public.posts for delete using (auth.uid() = user_id);

create index posts_user_idx    on public.posts(user_id);
create index posts_created_idx on public.posts(created_at desc);


-- ================================================
-- 5. POST_MEDIA (게시물 미디어)
-- ================================================
create table public.post_media (
  id         uuid primary key default uuid_generate_v4(),
  post_id    uuid not null references public.posts(id) on delete cascade,
  url        text not null,
  media_type text check (media_type in ('image', 'video')),
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table public.post_media enable row level security;

create policy "누구나 미디어 조회 가능"
  on public.post_media for select using (true);

create policy "본인 게시물 미디어만 추가 가능"
  on public.post_media for insert
  with check (
    auth.uid() = (select user_id from public.posts where id = post_id)
  );


-- ================================================
-- 6. POST_LIKES (좋아요)
-- ================================================
create table public.post_likes (
  id         uuid primary key default uuid_generate_v4(),
  post_id    uuid not null references public.posts(id) on delete cascade,
  user_id    uuid not null references public.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

alter table public.post_likes enable row level security;

create policy "누구나 좋아요 조회 가능"
  on public.post_likes for select using (true);

create policy "본인만 좋아요 가능"
  on public.post_likes for insert with check (auth.uid() = user_id);

create policy "본인만 좋아요 취소 가능"
  on public.post_likes for delete using (auth.uid() = user_id);

-- 좋아요 수 자동 업데이트 트리거
create or replace function update_post_likes_count()
returns trigger language plpgsql as $$
begin
  if TG_OP = 'INSERT' then
    update public.posts set likes_count = likes_count + 1 where id = NEW.post_id;
  elsif TG_OP = 'DELETE' then
    update public.posts set likes_count = likes_count - 1 where id = OLD.post_id;
  end if;
  return null;
end;
$$;

create trigger post_likes_count_trigger
  after insert or delete on public.post_likes
  for each row execute function update_post_likes_count();


-- ================================================
-- 7. FOLLOWS (팔로우 관계)
-- ================================================
create table public.follows (
  id           uuid primary key default uuid_generate_v4(),
  follower_id  uuid not null references public.users(id) on delete cascade,
  following_id uuid not null references public.users(id) on delete cascade,
  created_at   timestamptz default now(),
  unique(follower_id, following_id),
  check (follower_id <> following_id)        -- 자기 자신 팔로우 불가
);

alter table public.follows enable row level security;

create policy "누구나 팔로우 관계 조회 가능"
  on public.follows for select using (true);

create policy "본인만 팔로우 가능"
  on public.follows for insert with check (auth.uid() = follower_id);

create policy "본인만 언팔로우 가능"
  on public.follows for delete using (auth.uid() = follower_id);

create index follows_follower_idx  on public.follows(follower_id);
create index follows_following_idx on public.follows(following_id);


-- ================================================
-- 8. USER_EVENTS (유저 행동 로그)
-- ================================================
create table public.user_events (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references public.users(id) on delete set null,  -- 비로그인도 기록
  session_id   text,                         -- 세션 단위 추적
  screen       text not null,                -- "BeerDetailPage"
  action       text not null,                -- "view" | "tap_beer" | "like_post" | ...
  target_id    text,                         -- 대상 ID (beer_id, post_id 등)
  target_type  text,                         -- "beer" | "post" | "user" | "review"
  meta         jsonb,                        -- 추가 데이터 {"query":"IPA", "result_count":5}
  created_at   timestamptz default now()
);

alter table public.user_events enable row level security;

create policy "본인 이벤트만 조회 가능"
  on public.user_events for select using (auth.uid() = user_id);

create policy "누구나 이벤트 기록 가능"
  on public.user_events for insert with check (true);

create index user_events_user_idx    on public.user_events(user_id);
create index user_events_screen_idx  on public.user_events(screen);
create index user_events_action_idx  on public.user_events(action);
create index user_events_created_idx on public.user_events(created_at desc);

-- ── 행동 종류 참고 ──────────────────────────────
-- screen: HomePage / ExplorePage / BeerDetailPage / InputPage
--         DetailPage / ResultPage / CommunityPage / ProfilePage
--         SearchModal / BeerActionSheet
--
-- action: view / scroll / tap_beer / tap_review / tap_post
--         search / search_select / like_post / unlike_post
--         rate_start / rate_submit / post_create / follow / unfollow
--         share / barcode_scan / level_tap


-- ================================================
-- 9. updated_at 자동 갱신 트리거 (공통)
-- ================================================
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  NEW.updated_at = now();
  return NEW;
end;
$$;

create trigger users_updated_at   before update on public.users   for each row execute function set_updated_at();
create trigger beers_updated_at   before update on public.beers   for each row execute function set_updated_at();
create trigger reviews_updated_at before update on public.reviews for each row execute function set_updated_at();
create trigger posts_updated_at   before update on public.posts   for each row execute function set_updated_at();
