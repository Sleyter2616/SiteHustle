-- Add unique constraint on user_id if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'pillar1_data_user_id_key'
    ) THEN
        ALTER TABLE public.pillar1_data
            ADD CONSTRAINT pillar1_data_user_id_key UNIQUE (user_id);
    END IF;
END $$;
