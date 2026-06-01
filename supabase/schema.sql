-- =============================================================
-- EstudeMais — esquema do banco (Supabase / Postgres)
-- Cole este conteúdo no SQL Editor do Supabase e rode uma vez.
-- =============================================================

-- 1) PROFILES — dados extras do usuário (1:1 com auth.users)
create table if not exists public.profiles (
  id                uuid primary key references auth.users (id) on delete cascade,
  name              text,
  weekly_goal_hours int  not null default 12,
  theme             text not null default 'light',
  created_at        timestamptz not null default now()
);

-- 2) SUBJECTS — matérias do usuário
create table if not exists public.subjects (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  name       text not null,
  color      text not null default '#1F4234',
  created_at timestamptz not null default now()
);

-- 3) SESSIONS — sessões de estudo cronometradas
create table if not exists public.sessions (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  subject_id uuid references public.subjects (id) on delete set null,
  seconds    int  not null check (seconds >= 0),
  note       text,
  created_at timestamptz not null default now()
);

create index if not exists sessions_user_created_idx
  on public.sessions (user_id, created_at desc);

-- =============================================================
-- ROW LEVEL SECURITY — cada usuário só enxerga os próprios dados
-- =============================================================
alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.sessions enable row level security;

create policy "own profile"  on public.profiles
  for all using (auth.uid() = id)      with check (auth.uid() = id);
create policy "own subjects" on public.subjects
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own sessions" on public.sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =============================================================
-- Cria o profile automaticamente quando um usuário se cadastra
-- =============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data ->> 'name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
