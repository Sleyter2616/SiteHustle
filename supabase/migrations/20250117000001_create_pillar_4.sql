-- Create pillar_4_data table
CREATE TABLE IF NOT EXISTS pillar_4_data (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  progress JSONB NOT NULL DEFAULT '{
    "completedTasks": 0,
    "totalTasks": 0,
    "currentPhase": "branding",
    "brandingCompleted": false,
    "contentCompleted": false,
    "seoCompleted": false,
    "reviewCompleted": false
  }',
  branding JSONB NOT NULL DEFAULT '{
    "identity": {
      "personality": [],
      "values": [],
      "tone": []
    },
    "colors": {
      "primary": [],
      "accent": [],
      "neutral": []
    },
    "typography": {
      "headingFont": "",
      "bodyFont": "",
      "sizes": {
        "h1": "",
        "h2": "",
        "h3": "",
        "body": "",
        "small": ""
      }
    },
    "logo": {
      "url": "",
      "minSize": "",
      "spacing": "",
      "usage": {
        "dos": [],
        "donts": []
      }
    },
    "styleGuideCompleted": false
  }',
  content JSONB NOT NULL DEFAULT '{
    "templates": [],
    "aiGenerated": false,
    "lastEdited": ""
  }',
  images JSONB NOT NULL DEFAULT '{
    "assets": [],
    "optimizationCompleted": false
  }',
  seo JSONB NOT NULL DEFAULT '{
    "pages": [],
    "globalKeywords": [],
    "sitemap": false
  }',
  review JSONB NOT NULL DEFAULT '{
    "desktopChecked": false,
    "mobileChecked": false,
    "contentReviewed": false,
    "brandingConsistent": false,
    "feedback": []
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT unique_user_pillar_4 UNIQUE (user_id)
);

-- Add RLS policies
ALTER TABLE pillar_4_data ENABLE ROW LEVEL SECURITY;

-- Policy for selecting own data
CREATE POLICY select_own_pillar_4_data ON pillar_4_data
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for inserting own data
CREATE POLICY insert_own_pillar_4_data ON pillar_4_data
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for updating own data
CREATE POLICY update_own_pillar_4_data ON pillar_4_data
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for deleting own data
CREATE POLICY delete_own_pillar_4_data ON pillar_4_data
  FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_pillar_4_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_pillar_4_data_updated_at
  BEFORE UPDATE ON pillar_4_data
  FOR EACH ROW
  EXECUTE FUNCTION update_pillar_4_updated_at();
