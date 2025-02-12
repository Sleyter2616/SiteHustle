-- Update the updated_at column to have a default value
alter table if exists public.wizard_steps 
alter column updated_at set default now();

-- Add RLS policies to secure the table
alter table public.wizard_steps enable row level security;

-- Policy to allow users to read only their own data
create policy "Users can read their own wizard steps"
  on public.wizard_steps
  for select
  using (auth.uid()::text = user_id);

-- Policy to allow users to insert/update their own data
create policy "Users can insert their own wizard steps"
  on public.wizard_steps
  for insert
  with check (auth.uid()::text = user_id);

create policy "Users can update their own wizard steps"
  on public.wizard_steps
  for update
  using (auth.uid()::text = user_id)
  with check (auth.uid()::text = user_id);

-- Add an index for faster queries on user_id
create index if not exists wizard_steps_user_id_idx on public.wizard_steps (user_id);

-- Add a trigger to automatically update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.wizard_steps
  for each row
  execute procedure public.handle_updated_at();
