SELECT 'CREATE DATABASE udacity_project_2'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'udacity_project_2')\gexec
SELECT 'CREATE DATABASE udacity_project_2_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'udacity_project_2_test')\gexec
SELECT 'CREATE USER admin WITH PASSWORD 12345678'
WHERE NOT EXISTS (SELECT FROM pg_user WHERE usename = 'test_user')\gexec
GRANT ALL PRIVILEGES ON DATABASE udacity_project_2 TO test_user;
GRANT ALL PRIVILEGES ON DATABASE udacity_project_2_test TO test_user;
