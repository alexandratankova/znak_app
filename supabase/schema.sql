-- Esegui questo script nella SQL Editor del dashboard Supabase (https://supabase.com/dashboard)

-- Tabella per i progressi utente (lettere tracciate)
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  traced_letter_ids text[] not null default '{}',
  updated_at timestamptz not null default now(),
  unique(user_id)
);

-- Row Level Security (RLS): ogni utente vede/salva solo i propri dati
alter table public.user_progress enable row level security;

create policy "Users can view own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
