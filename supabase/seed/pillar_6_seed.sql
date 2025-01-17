-- Insert sample knowledge base articles
INSERT INTO pillar_6_data (user_id, tutorials, coaching, support, milestones, feedback)
VALUES (
  '', -- Replace with actual test user ID
  jsonb_build_object(
    'library', jsonb_build_array(
      jsonb_build_object(
        'id', 'site-navigation',
        'title', 'Navigating Your Site Dashboard',
        'description', 'Learn the basics of your site''s admin interface',
        'url', '/tutorials/site-navigation.mp4',
        'category', 'basics',
        'duration', 180,
        'tags', array['getting-started', 'dashboard', 'navigation'],
        'watched', false,
        'notes', ''
      ),
      jsonb_build_object(
        'id', 'content-management',
        'title', 'Managing Your Content',
        'description', 'Master content creation and organization',
        'url', '/tutorials/content-management.mp4',
        'category', 'content',
        'duration', 240,
        'tags', array['content', 'editing', 'organization'],
        'watched', false,
        'notes', ''
      ),
      jsonb_build_object(
        'id', 'seo-basics',
        'title', 'SEO Fundamentals',
        'description', 'Understand basic SEO principles',
        'url', '/tutorials/seo-basics.mp4',
        'category', 'marketing',
        'duration', 300,
        'tags', array['seo', 'marketing', 'optimization'],
        'watched', false,
        'notes', ''
      )
    ),
    'watchHistory', jsonb_build_array(),
    'preferences', jsonb_build_object(
      'autoplay', false,
      'playbackSpeed', 1,
      'closedCaptions', false
    )
  ),
  jsonb_build_object(
    'sessions', jsonb_build_array(
      jsonb_build_object(
        'id', 'initial-consultation',
        'scheduledDate', (now() + interval '1 week')::text,
        'completed', false,
        'topics', jsonb_build_array(
          jsonb_build_object(
            'title', 'Site Goals Discussion',
            'completed', false,
            'notes', 'Define primary objectives and target audience'
          ),
          jsonb_build_object(
            'title', 'Technical Requirements',
            'completed', false,
            'notes', 'Review hosting and domain setup'
          )
        ),
        'actionItems', jsonb_build_array(
          jsonb_build_object(
            'task', 'Complete site questionnaire',
            'completed', false,
            'dueDate', (now() + interval '3 days')::text
          ),
          jsonb_build_object(
            'task', 'Gather brand assets',
            'completed', false,
            'dueDate', (now() + interval '5 days')::text
          )
        ),
        'feedback', jsonb_build_object(
          'rating', 0,
          'comments', ''
        )
      )
    ),
    'preferences', jsonb_build_object(
      'preferredDay', 'Wednesday',
      'preferredTime', '14:00',
      'timezone', 'America/New_York',
      'format', 'video'
    ),
    'notes', 'Initial consultation scheduled'
  ),
  jsonb_build_object(
    'currentPlan', jsonb_build_object(
      'type', 'monthly',
      'active', true,
      'startDate', now()::text,
      'features', jsonb_build_array(
        jsonb_build_object(
          'name', 'Priority Support',
          'included', true,
          'details', '24/7 access to support team'
        ),
        jsonb_build_object(
          'name', 'Monthly Check-ins',
          'included', true,
          'details', 'Regular progress reviews'
        ),
        jsonb_build_object(
          'name', 'Resource Library',
          'included', true,
          'details', 'Access to exclusive guides and templates'
        )
      ),
      'pricing', jsonb_build_object(
        'amount', 199,
        'interval', 'month',
        'currency', 'USD'
      )
    ),
    'history', jsonb_build_array(
      jsonb_build_object(
        'type', 'support_request',
        'date', (now() - interval '2 days')::text,
        'description', 'Initial setup assistance',
        'resolved', true
      )
    ),
    'knowledgeBase', jsonb_build_object(
      'articles', jsonb_build_array(
        jsonb_build_object(
          'id', 'getting-started',
          'title', 'Getting Started Guide',
          'content', 'Step-by-step guide to setting up your site',
          'category', 'basics',
          'tags', array['setup', 'configuration'],
          'lastUpdated', now()::text,
          'helpful', true
        ),
        jsonb_build_object(
          'id', 'seo-guide',
          'title', 'SEO Best Practices',
          'content', 'Comprehensive guide to optimizing your site',
          'category', 'marketing',
          'tags', array['seo', 'optimization'],
          'lastUpdated', now()::text,
          'helpful', true
        )
      ),
      'favorites', jsonb_build_array('getting-started')
    )
  ),
  jsonb_build_object(
    'achieved', jsonb_build_array(
      jsonb_build_object(
        'id', 'site-launch',
        'title', 'Site Launch',
        'description', 'Successfully launched the website',
        'achievedDate', (now() - interval '1 week')::text,
        'type', 'feature',
        'metrics', jsonb_build_array(
          jsonb_build_object(
            'name', 'Launch Time',
            'value', '2',
            'unit', 'weeks'
          )
        )
      )
    ),
    'upcoming', jsonb_build_array(
      jsonb_build_object(
        'title', 'First Blog Post',
        'description', 'Publish initial content',
        'targetDate', (now() + interval '1 week')::text
      ),
      jsonb_build_object(
        'title', '100 Visitors',
        'description', 'Reach first traffic milestone',
        'targetDate', (now() + interval '1 month')::text
      )
    )
  ),
  jsonb_build_object(
    'testimonial', jsonb_build_object(
      'id', uuid_generate_v4(),
      'content', 'Great experience with the platform so far!',
      'rating', 5,
      'date', now()::text,
      'permission', true,
      'public', true
    ),
    'nps', 9,
    'suggestions', jsonb_build_array(
      'Add more video tutorials',
      'Include downloadable resources'
    )
  )
);

-- Insert a completed tutorial example
INSERT INTO pillar_6_data (user_id, tutorials, coaching, support, milestones, feedback)
SELECT 
  '', -- Replace with another test user ID
  jsonb_set(
    tutorials,
    '{library,0,watched}',
    'true'::jsonb
  ),
  coaching,
  support,
  milestones,
  feedback
FROM pillar_6_data
WHERE user_id = '';
