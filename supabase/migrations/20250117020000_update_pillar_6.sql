-- Update default values for tutorials
ALTER TABLE pillar_6_data 
ALTER COLUMN tutorials SET DEFAULT '{
  "library": [
    {
      "id": "site-navigation",
      "title": "Navigating Your Site Dashboard",
      "description": "Learn the basics of your site''s admin interface",
      "url": "/tutorials/site-navigation.mp4",
      "category": "basics",
      "duration": 180,
      "tags": ["getting-started", "dashboard", "navigation"],
      "watched": false,
      "notes": ""
    },
    {
      "id": "content-management",
      "title": "Managing Your Content",
      "description": "Master content creation and organization",
      "url": "/tutorials/content-management.mp4",
      "category": "content",
      "duration": 240,
      "tags": ["content", "editing", "organization"],
      "watched": false,
      "notes": ""
    },
    {
      "id": "seo-basics",
      "title": "SEO Fundamentals",
      "description": "Understand basic SEO principles",
      "url": "/tutorials/seo-basics.mp4",
      "category": "marketing",
      "duration": 300,
      "tags": ["seo", "marketing", "optimization"],
      "watched": false,
      "notes": ""
    }
  ],
  "watchHistory": [],
  "preferences": {
    "autoplay": false,
    "playbackSpeed": 1,
    "closedCaptions": false
  }
}';

-- Update default values for support
ALTER TABLE pillar_6_data 
ALTER COLUMN support SET DEFAULT '{
  "currentPlan": {
    "type": "monthly",
    "active": false,
    "startDate": "",
    "features": [],
    "pricing": {
      "amount": 0,
      "interval": "month",
      "currency": "USD"
    }
  },
  "history": [],
  "knowledgeBase": {
    "articles": [],
    "favorites": []
  }
}';

-- Update default values for feedback
ALTER TABLE pillar_6_data 
ALTER COLUMN feedback SET DEFAULT '{
  "testimonial": {
    "id": "",
    "content": "",
    "rating": 0,
    "date": "",
    "permission": false,
    "public": false
  },
  "nps": 0,
  "suggestions": []
}';

-- Update existing rows with new default values
UPDATE pillar_6_data
SET 
  tutorials = (SELECT tutorials::jsonb FROM pillar_6_data LIMIT 1) || '{
    "library": [
      {
        "id": "site-navigation",
        "title": "Navigating Your Site Dashboard",
        "description": "Learn the basics of your site''s admin interface",
        "url": "/tutorials/site-navigation.mp4",
        "category": "basics",
        "duration": 180,
        "tags": ["getting-started", "dashboard", "navigation"],
        "watched": false,
        "notes": ""
      },
      {
        "id": "content-management",
        "title": "Managing Your Content",
        "description": "Master content creation and organization",
        "url": "/tutorials/content-management.mp4",
        "category": "content",
        "duration": 240,
        "tags": ["content", "editing", "organization"],
        "watched": false,
        "notes": ""
      },
      {
        "id": "seo-basics",
        "title": "SEO Fundamentals",
        "description": "Understand basic SEO principles",
        "url": "/tutorials/seo-basics.mp4",
        "category": "marketing",
        "duration": 300,
        "tags": ["seo", "marketing", "optimization"],
        "watched": false,
        "notes": ""
      }
    ]
  }'::jsonb
WHERE tutorials->>'library' = '[]' OR tutorials IS NULL;
