create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text not null,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.couple_rooms (
  id uuid primary key default gen_random_uuid(),
  invite_code text not null unique,
  user1_id uuid not null references public.profiles(id) on delete cascade,
  user2_id uuid references public.profiles(id) on delete set null,
  partner_name_hint text,
  streak_count integer not null default 0,
  last_answer_date text,
  countdown_title text,
  countdown_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.couple_rooms(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  date_key text not null,
  question_vi text not null,
  question_en text,
  answer_text text not null,
  created_at timestamptz not null default now(),
  unique(room_id, user_id, date_key)
);

create table if not exists public.bucket_list (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.couple_rooms(id) on delete cascade,
  text text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.couple_rooms(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  image_path text not null,
  image_url text not null,
  caption text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.couple_rooms enable row level security;
alter table public.answers enable row level security;
alter table public.bucket_list enable row level security;
alter table public.memories enable row level security;

create policy "profiles are readable by authenticated users"
on public.profiles for select to authenticated using (true);

create policy "users can upsert own profile"
on public.profiles for insert to authenticated with check (auth.uid() = id);

create policy "users can update own profile"
on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "members can read their rooms"
on public.couple_rooms for select to authenticated
using (auth.uid() = user1_id or auth.uid() = user2_id);

create policy "authenticated users can read open invite rooms"
on public.couple_rooms for select to authenticated
using (user2_id is null);

create policy "users can create own rooms"
on public.couple_rooms for insert to authenticated
with check (auth.uid() = user1_id);

create policy "room creator or joiner can update room"
on public.couple_rooms for update to authenticated
using (auth.uid() = user1_id or auth.uid() = user2_id or user2_id is null)
with check (auth.uid() = user1_id or auth.uid() = user2_id);

create policy "members can read answers"
on public.answers for select to authenticated
using (exists (
  select 1 from public.couple_rooms r
  where r.id = answers.room_id and (r.user1_id = auth.uid() or r.user2_id = auth.uid())
));

create policy "members can write own answers"
on public.answers for insert to authenticated
with check (auth.uid() = user_id and exists (
  select 1 from public.couple_rooms r
  where r.id = answers.room_id and (r.user1_id = auth.uid() or r.user2_id = auth.uid())
));

create policy "members can update own answers"
on public.answers for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "members can read bucket"
on public.bucket_list for select to authenticated
using (exists (
  select 1 from public.couple_rooms r
  where r.id = bucket_list.room_id and (r.user1_id = auth.uid() or r.user2_id = auth.uid())
));

create policy "members can insert bucket"
on public.bucket_list for insert to authenticated
with check (exists (
  select 1 from public.couple_rooms r
  where r.id = bucket_list.room_id and (r.user1_id = auth.uid() or r.user2_id = auth.uid())
));

create policy "members can update bucket"
on public.bucket_list for update to authenticated
using (exists (
  select 1 from public.couple_rooms r
  where r.id = bucket_list.room_id and (r.user1_id = auth.uid() or r.user2_id = auth.uid())
));

create policy "members can read memories"
on public.memories for select to authenticated
using (exists (
  select 1 from public.couple_rooms r
  where r.id = memories.room_id and (r.user1_id = auth.uid() or r.user2_id = auth.uid())
));

create policy "members can insert memories"
on public.memories for insert to authenticated
with check (auth.uid() = user_id and exists (
  select 1 from public.couple_rooms r
  where r.id = memories.room_id and (r.user1_id = auth.uid() or r.user2_id = auth.uid())
));

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true), ('memories', 'memories', true)
on conflict (id) do nothing;

create policy "authenticated users can upload avatars"
on storage.objects for insert to authenticated
with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "authenticated users can update own avatars"
on storage.objects for update to authenticated
using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "public can read app images"
on storage.objects for select to public
using (bucket_id in ('avatars', 'memories'));

create policy "room members can upload memories"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'memories'
  and exists (
    select 1 from public.couple_rooms r
    where r.id::text = (storage.foldername(name))[1]
    and (r.user1_id = auth.uid() or r.user2_id = auth.uid())
  )
);

do $$
begin
  alter publication supabase_realtime add table public.answers;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.bucket_list;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.memories;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.couple_rooms;
exception when duplicate_object then null;
end $$;
-- 1. Cho phép mọi người (kể cả chưa đăng nhập) được Đọc bảng profiles
CREATE POLICY "Cho phép đọc công khai" 
ON profiles FOR SELECT 
TO anon 
USING (true);

-- 2. Cho phép mọi người được Thêm mới vào bảng profiles
CREATE POLICY "Cho phép tạo profile mới" 
ON profiles FOR INSERT 
TO anon 
WITH CHECK (true);

-- 3. Đảm bảo bảng profiles đã bật RLS (thường là bật sẵn rồi)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;