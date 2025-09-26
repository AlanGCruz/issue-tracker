-- Drop the user if it exists and recreate it
DROP USER IF EXISTS "user";
CREATE USER "user" WITH PASSWORD 'password';
ALTER USER "user" WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE issuetracker TO "user";