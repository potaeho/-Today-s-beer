-- ================================================
-- 02. 소셜 로그인 후 users 테이블 자동 생성 트리거
-- ================================================
-- auth.users에 새 유저가 들어오면 public.users 에 자동으로 row 생성
-- Kakao: raw_user_meta_data->>'name'
-- Google: raw_user_meta_data->>'full_name', 'avatar_url'
-- Apple:  raw_user_meta_data->>'name' (성명)

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer         -- auth 스키마 접근용
set search_path = public
as $$
declare
  v_name   text;
  v_avatar text;
  v_handle text;
begin
  -- 이름: Google full_name → Kakao name → 기본값
  v_name   := coalesce(
                new.raw_user_meta_data->>'full_name',
                new.raw_user_meta_data->>'name',
                '맥주러버'
              );

  -- 아바타: Google avatar_url → Kakao picture
  v_avatar := coalesce(
                new.raw_user_meta_data->>'avatar_url',
                new.raw_user_meta_data->>'picture'
              );

  -- 핸들: @user_ + UUID 앞 8자 (나중에 직접 변경 가능)
  v_handle := '@user_' || substring(new.id::text, 1, 8);

  insert into public.users (id, username, handle, avatar_url)
  values (new.id, v_name, v_handle, v_avatar)
  on conflict (id) do nothing;

  return new;
end;
$$;

-- 트리거 (중복 생성 방지)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
