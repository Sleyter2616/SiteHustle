-- Create pillars table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.pillars (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title text NOT NULL,
    description text NOT NULL,
    order_number integer NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_progress table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_progress (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id uuid REFERENCES auth.users NOT NULL,
    pillar_id bigint REFERENCES public.pillars NOT NULL,
    completed boolean DEFAULT false,
    completed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, pillar_id)
);

-- Create pillar_3_data table if it doesn't exist
CREATE TABLE IF NOT EXISTS pillar_3_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  selected_platform TEXT,
  progress JSONB NOT NULL DEFAULT '{
    "completedTasks": 0,
    "totalTasks": 0,
    "currentPhase": "setup",
    "setupCompleted": false,
    "pagesCompleted": false,
    "testingCompleted": false,
    "refinementCompleted": false
  }',
  setup JSONB NOT NULL DEFAULT '{
    "tasks": [],
    "globalStyles": {}
  }',
  pages JSONB NOT NULL DEFAULT '{
    "templates": [],
    "navigation": {
      "menuItems": [],
      "footerLinks": []
    }
  }',
  testing JSONB NOT NULL DEFAULT '{
    "tests": [],
    "feedback": {}
  }',
  custom_domain JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT unique_user_pillar_3 UNIQUE (user_id)
);

-- Add RLS policies if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'pillar_3_data' AND policyname = 'select_own_pillar_3_data'
    ) THEN
        ALTER TABLE pillar_3_data ENABLE ROW LEVEL SECURITY;

        CREATE POLICY select_own_pillar_3_data ON pillar_3_data
            FOR SELECT
            USING (auth.uid() = user_id);

        CREATE POLICY insert_own_pillar_3_data ON pillar_3_data
            FOR INSERT
            WITH CHECK (auth.uid() = user_id);

        CREATE POLICY update_own_pillar_3_data ON pillar_3_data
            FOR UPDATE
            USING (auth.uid() = user_id)
            WITH CHECK (auth.uid() = user_id);

        CREATE POLICY delete_own_pillar_3_data ON pillar_3_data
            FOR DELETE
            USING (auth.uid() = user_id);
    END IF;
END
$$;

-- Add RLS policies
ALTER TABLE public.pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Pillar policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Pillars are viewable by everyone' AND tablename = 'pillars') THEN
        CREATE POLICY "Pillars are viewable by everyone" ON public.pillars FOR SELECT USING (true);
    END IF;
END $$;

-- User progress policies
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own progress' AND tablename = 'user_progress') THEN
        CREATE POLICY "Users can view their own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own progress' AND tablename = 'user_progress') THEN
        CREATE POLICY "Users can update their own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can modify their own progress' AND tablename = 'user_progress') THEN
        CREATE POLICY "Users can modify their own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

-- Grant access
GRANT ALL ON public.pillars TO authenticated;
GRANT ALL ON public.user_progress TO authenticated;
