-- Create pillar_6_data table
CREATE TABLE IF NOT EXISTS pillar_6_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  progress JSONB NOT NULL DEFAULT '{
    "completedTasks": 0,
    "totalTasks": 0,
    "currentPhase": "tutorials",
    "tutorialsWatched": 0,
    "coachingCompleted": false,
    "supportPlanSelected": false,
    "graduated": false
  }',
  tutorials JSONB NOT NULL DEFAULT '{
    "library": [],
    "watchHistory": [],
    "preferences": {
      "autoplay": true,
      "playbackSpeed": 1,
      "closedCaptions": false
    }
  }',
  coaching JSONB NOT NULL DEFAULT '{
    "sessions": [],
    "preferences": {
      "preferredDay": "",
      "preferredTime": "",
      "timezone": "",
      "format": "video"
    },
    "notes": ""
  }',
  support JSONB NOT NULL DEFAULT '{
    "currentPlan": null,
    "history": [],
    "knowledgeBase": {
      "articles": [],
      "favorites": []
    }
  }',
  milestones JSONB NOT NULL DEFAULT '{
    "achieved": [],
    "upcoming": []
  }',
  feedback JSONB NOT NULL DEFAULT '{
    "testimonial": null,
    "nps": null,
    "suggestions": []
  }',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE pillar_6_data ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own pillar 6 data" ON pillar_6_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pillar 6 data" ON pillar_6_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pillar 6 data" ON pillar_6_data
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own pillar 6 data" ON pillar_6_data
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_pillar_6_user_id ON pillar_6_data(user_id);
CREATE INDEX IF NOT EXISTS idx_pillar_6_created_at ON pillar_6_data(created_at);

-- Grant permissions
GRANT ALL ON pillar_6_data TO authenticated;
