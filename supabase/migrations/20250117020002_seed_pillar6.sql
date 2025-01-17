-- Create test users if they don't exist
DO $$
DECLARE
  test_user_id UUID;
  completed_user_id UUID;
BEGIN
  -- Get or create first test user
  SELECT id INTO test_user_id FROM auth.users WHERE email = 'test@example.com';
  IF test_user_id IS NULL THEN
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role, raw_app_meta_data, raw_user_meta_data)
    VALUES (
      gen_random_uuid(),
      'test@example.com',
      crypt('test-password', gen_salt('bf')),
      NOW(),
      'authenticated',
      '{"provider":"email","providers":["email"]}',
      '{}'
    ) RETURNING id INTO test_user_id;
  END IF;

  -- Get or create second test user
  SELECT id INTO completed_user_id FROM auth.users WHERE email = 'test2@example.com';
  IF completed_user_id IS NULL THEN
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role, raw_app_meta_data, raw_user_meta_data)
    VALUES (
      gen_random_uuid(),
      'test2@example.com',
      crypt('test-password', gen_salt('bf')),
      NOW(),
      'authenticated',
      '{"provider":"email","providers":["email"]}',
      '{}'
    ) RETURNING id INTO completed_user_id;
  END IF;

  -- Delete existing pillar 6 data for these users if it exists
  DELETE FROM pillar_6_data WHERE user_id IN (test_user_id, completed_user_id);

  -- Insert sample data for first user
  INSERT INTO pillar_6_data (user_id, tutorials, coaching, support, milestones, feedback)
  VALUES (
    test_user_id,
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
            )
          ),
          'actionItems', jsonb_build_array(
            jsonb_build_object(
              'task', 'Complete site questionnaire',
              'completed', false,
              'dueDate', (now() + interval '3 days')::text
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
          )
        ),
        'pricing', jsonb_build_object(
          'amount', 199,
          'interval', 'month',
          'currency', 'USD'
        )
      ),
      'history', jsonb_build_array(),
      'knowledgeBase', jsonb_build_object(
        'articles', jsonb_build_array(),
        'favorites', jsonb_build_array()
      )
    ),
    jsonb_build_object(
      'achieved', jsonb_build_array(),
      'upcoming', jsonb_build_array(
        jsonb_build_object(
          'title', 'First Blog Post',
          'description', 'Publish initial content',
          'targetDate', (now() + interval '1 week')::text
        )
      )
    ),
    jsonb_build_object(
      'testimonial', null,
      'nps', null,
      'suggestions', jsonb_build_array()
    )
  );

  -- Insert data for second user with completed tutorial
  INSERT INTO pillar_6_data (user_id, tutorials, coaching, support, milestones, feedback)
  SELECT 
    completed_user_id,
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
  WHERE user_id = test_user_id;

END $$;
