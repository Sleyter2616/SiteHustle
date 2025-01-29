-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own pillar1 data" ON public.pillar1_data;
DROP POLICY IF EXISTS "Users can insert own pillar1 data" ON public.pillar1_data;
DROP POLICY IF EXISTS "Users can update own pillar1 data" ON public.pillar1_data;

-- Enable RLS
ALTER TABLE public.pillar1_data ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies
CREATE POLICY "Users can view own pillar1 data"
ON public.pillar1_data FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pillar1 data"
ON public.pillar1_data FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pillar1 data"
ON public.pillar1_data FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own pillar1 data"
ON public.pillar1_data FOR DELETE
USING (auth.uid() = user_id);
