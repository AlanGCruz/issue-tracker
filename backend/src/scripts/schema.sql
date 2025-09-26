-- =====================================================
-- Issues table
-- =====================================================
CREATE TABLE IF NOT EXISTS issues (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo','in-progress','done')),
  priority TEXT NOT NULL DEFAULT 'med' CHECK (priority IN ('low','med','high')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- Trigger function: auto-update updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

-- Drop old trigger if exists
DROP TRIGGER IF EXISTS issues_updated_at ON issues;

-- Create trigger: runs before every UPDATE on issues
CREATE TRIGGER issues_updated_at
BEFORE UPDATE ON issues
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at();

-- =====================================================
-- Indexes
-- =====================================================

-- Composite index for filtering by status and ordering by created_at DESC
-- CREATE INDEX IF NOT EXISTS idx_issues_status_created_at
--   ON issues (status, created_at DESC);

-- optional: to support ORDER BY when filtering (status first, then created_at)
CREATE INDEX IF NOT EXISTS idx_issues_status_created_at ON issues(status, created_at DESC);