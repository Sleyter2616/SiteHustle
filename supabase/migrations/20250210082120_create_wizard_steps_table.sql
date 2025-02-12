create table if not exists public.wizard_steps (
  user_id text not null,
  step_id text not null,
  user_input jsonb not null,
  ai_output text default '',
  updated_at timestamptz not null,
  primary key (user_id, step_id)
);