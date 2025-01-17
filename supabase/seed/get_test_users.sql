-- Get test users
SELECT id, email
FROM auth.users
WHERE email LIKE '%test%'
ORDER BY created_at DESC
LIMIT 2;
