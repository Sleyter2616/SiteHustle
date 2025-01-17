-- Drop existing tables (which will automatically drop their policies)
drop table if exists public.user_progress;
drop table if exists public.pillars;

-- Create tables
create table public.pillars (
    id bigint primary key generated always as identity,
    title text not null,
    description text not null,
    order_number integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.user_progress (
    id bigint primary key generated always as identity,
    user_id uuid references auth.users not null,
    pillar_id bigint references public.pillars not null,
    completed boolean default false,
    completed_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, pillar_id)
);

-- Enable RLS
alter table public.pillars enable row level security;
alter table public.user_progress enable row level security;

-- Drop existing policies if they exist
do $$ 
begin
    drop policy if exists "Pillars are viewable by everyone" on public.pillars;
    drop policy if exists "Users can view their own progress" on public.user_progress;
    drop policy if exists "Users can insert their own progress" on public.user_progress;
    drop policy if exists "Users can modify their own progress" on public.user_progress;
exception 
    when undefined_table then null;
end $$;

-- Create policies
create policy "Pillars are viewable by everyone"
    on public.pillars for select
    using (true);

create policy "Users can view their own progress"
    on public.user_progress for select
    using (auth.uid() = user_id);

create policy "Users can insert their own progress"
    on public.user_progress for insert
    with check (auth.uid() = user_id);

create policy "Users can modify their own progress"
    on public.user_progress for update
    using (auth.uid() = user_id);

-- Grant access
grant usage on schema public to authenticated, anon;
grant all on public.pillars to authenticated, anon;
grant all on public.user_progress to authenticated;
grant usage on all sequences in schema public to authenticated;

-- Insert initial pillar data
insert into public.pillars (title, description, order_number)
values
    ('Business Foundations', 'Define your business goals, target audience, and unique value proposition.', 1),
    ('Tool Selection & AI Bootcamp', 'Choose your no-code tools and master AI-powered automation.', 2),
    ('Website Building', 'Build your professional website or web application.', 3),
    ('Growth & Marketing', 'Implement strategies to attract and convert customers.', 4),
    ('Monetization', 'Set up payment systems and optimize revenue streams.', 5),
    ('Automation & Scale', 'Automate processes and prepare for business growth.', 6);
