-- Create pillars table if it doesn't exist
create table if not exists public.pillars (
    id bigint primary key generated always as identity,
    title text not null,
    description text not null,
    order_number integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user_progress table if it doesn't exist
create table if not exists public.user_progress (
    id bigint primary key generated always as identity,
    user_id uuid references auth.users not null,
    pillar_id bigint references public.pillars not null,
    completed boolean default false,
    completed_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, pillar_id)
);

-- Insert pillar data
insert into public.pillars (title, description, order_number)
values
    ('Business Foundations', 'Define your business goals, target audience, and unique value proposition.', 1),
    ('Tool Selection & AI Bootcamp', 'Choose your no-code tools and master AI-powered automation.', 2),
    ('Website Building', 'Build your professional website or web application.', 3),
    ('Growth & Marketing', 'Implement strategies to attract and convert customers.', 4),
    ('Monetization', 'Set up payment systems and optimize revenue streams.', 5),
    ('Automation & Scale', 'Automate processes and prepare for business growth.', 6)
on conflict (id) do update set
    title = excluded.title,
    description = excluded.description,
    order_number = excluded.order_number;

-- Add RLS policies
alter table public.pillars enable row level security;
alter table public.user_progress enable row level security;

-- Pillar policies (create only if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Pillars are viewable by everyone' AND tablename = 'pillars') THEN
        CREATE POLICY "Pillars are viewable by everyone" ON public.pillars FOR SELECT USING (true);
    END IF;
END $$;

-- User progress policies (create only if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own progress' AND tablename = 'user_progress') THEN
        CREATE POLICY "Users can view their own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own progress' AND tablename = 'user_progress') THEN
        CREATE POLICY "Users can update their own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;

    -- Note: You had two policies with the same name "Users can update their own progress" - I've corrected this to "Users can modify their own progress"
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can modify their own progress' AND tablename = 'user_progress') THEN
        CREATE POLICY "Users can modify their own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

-- Grant access
grant usage on schema public to authenticated, anon;
grant all on public.pillars to authenticated, anon;
grant all on public.user_progress to authenticated;
grant usage on all sequences in schema public to authenticated;