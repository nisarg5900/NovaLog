-- Idea Tracker — Supabase schema
-- Run this once in the Supabase SQL editor (Project → SQL editor → New query).

create table if not exists public.idea_tracker_state (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.idea_tracker_state enable row level security;

-- Each user can only see/edit their own row.
drop policy if exists "own row select" on public.idea_tracker_state;
create policy "own row select" on public.idea_tracker_state
  for select using (auth.uid() = user_id);

drop policy if exists "own row insert" on public.idea_tracker_state;
create policy "own row insert" on public.idea_tracker_state
  for insert with check (auth.uid() = user_id);

drop policy if exists "own row update" on public.idea_tracker_state;
create policy "own row update" on public.idea_tracker_state
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own row delete" on public.idea_tracker_state;
create policy "own row delete" on public.idea_tracker_state
  for delete using (auth.uid() = user_id);

-- Lets a signed-in user delete their own auth.users row (cascades to
-- idea_tracker_state). SECURITY DEFINER is safe because the body
-- restricts the delete to auth.uid().
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;
  delete from auth.users where id = v_uid;
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
