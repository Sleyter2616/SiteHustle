-- Enable RLS
ALTER TABLE pillar_6_data ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own pillar 6 data"
    ON pillar_6_data
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pillar 6 data"
    ON pillar_6_data
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pillar 6 data"
    ON pillar_6_data
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pillar 6 data"
    ON pillar_6_data
    FOR DELETE
    USING (auth.uid() = user_id);
