INSERT INTO issues (title, description, status, priority, created_at, updated_at)
VALUES
  ('Uploader fails on large files', 'Users cannot upload >100MB', 'todo', 'high', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
  ('Polish homepage spacing', 'Adjust margins and paddings', 'in-progress', 'med', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),
  ('Add dark mode', 'Implement theme switcher', 'done', 'low', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
  ('Fix login bug', 'OAuth redirect fails on Safari', 'todo', 'high', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
  ('Improve search performance', 'Optimize DB indexes', 'in-progress', 'high', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
  ('Write API docs', 'Document v1 endpoints', 'todo', 'med', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
  ('Update dependencies', 'Bump React to latest version', 'done', 'low', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),
  ('Refactor issue service', 'Split into controller/service/repo', 'in-progress', 'med', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
  ('Add pagination to issues list', 'Support limit/offset', 'todo', 'high', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
  ('Enable CORS in API', 'Allow requests from frontend dev server', 'done', 'low', NOW() - INTERVAL '1 days', NOW() - INTERVAL '1 days');