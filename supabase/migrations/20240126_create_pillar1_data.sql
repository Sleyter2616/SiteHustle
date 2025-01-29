-- Create pillar1_data table
CREATE TABLE IF NOT EXISTS public.pillar1_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    pillar_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS pillar1_data_user_id_idx ON public.pillar1_data(user_id);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.pillar1_data ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to only see their own data
CREATE POLICY "Users can view own pillar1 data" ON public.pillar1_data
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy to allow users to insert their own data
CREATE POLICY "Users can insert own pillar1 data" ON public.pillar1_data
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own data
CREATE POLICY "Users can update own pillar1 data" ON public.pillar1_data
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to call the updated_at function
CREATE TRIGGER handle_pillar1_data_updated_at
    BEFORE UPDATE ON public.pillar1_data
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
