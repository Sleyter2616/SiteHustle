-- Create pillar_5_data table
CREATE TABLE IF NOT EXISTS pillar_5_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  progress JSONB NOT NULL DEFAULT '{
    "completedTasks": 0,
    "totalTasks": 0,
    "currentPhase": "domain",
    "domainConfigured": false,
    "analyticsConfigured": false,
    "performanceTested": false,
    "scalabilityPlanned": false,
    "launched": false,
    "maintenanceScheduled": false
  }',
  domain JSONB NOT NULL DEFAULT '{
    "config": {
      "provider": "",
      "domain": "",
      "configured": false,
      "ssl": false,
      "dnsRecords": []
    },
    "prelaunchChecks": {
      "ssl": false,
      "mobileFriendly": false,
      "crossBrowser": false,
      "backupCreated": false,
      "redirectsConfigured": false
    }
  }',
  analytics JSONB NOT NULL DEFAULT '{
    "setup": {
      "provider": "",
      "trackingId": "",
      "configured": false,
      "additionalTools": []
    },
    "goals": []
  }',
  performance JSONB NOT NULL DEFAULT '{
    "tests": [],
    "optimizations": []
  }',
  scalability JSONB NOT NULL DEFAULT '{
    "features": [],
    "documentation": []
  }',
  maintenance JSONB NOT NULL DEFAULT '{
    "schedule": [],
    "logs": []
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT unique_user_pillar_5 UNIQUE (user_id)
);

-- Add RLS policies
ALTER TABLE pillar_5_data ENABLE ROW LEVEL SECURITY;

-- Policy for selecting own data
CREATE POLICY select_own_pillar_5_data ON pillar_5_data
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for inserting own data
CREATE POLICY insert_own_pillar_5_data ON pillar_5_data
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for updating own data
CREATE POLICY update_own_pillar_5_data ON pillar_5_data
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for deleting own data
CREATE POLICY delete_own_pillar_5_data ON pillar_5_data
  FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_pillar_5_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_pillar_5_data_updated_at
  BEFORE UPDATE ON pillar_5_data
  FOR EACH ROW
  EXECUTE FUNCTION update_pillar_5_updated_at();
