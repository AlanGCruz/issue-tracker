-- =====================================================
-- Issues table
-- =====================================================
-- Create ENUM types first
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'issue_status') THEN
        CREATE TYPE issue_status AS ENUM ('todo', 'in-progress', 'done');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'issue_priority') THEN
        CREATE TYPE issue_priority AS ENUM ('low', 'med', 'high');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS issues (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  status issue_status NOT NULL DEFAULT 'todo',
  priority issue_priority NOT NULL DEFAULT 'med',
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