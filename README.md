# Storefront Backend Project

## Instructions

1. Install all dependencies with `npm install`
2. Create a user and the databases via psql commands and grant privileges or run db-init file:

```
SELECT 'CREATE DATABASE storefront'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'storefront')\gexec

SELECT 'CREATE DATABASE storefront_test'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'storefront_test')\gexec

SELECT 'CREATE USER admin WITH PASSWORD password123'
WHERE NOT EXISTS (SELECT FROM pg_user WHERE usename = 'admin')\gexec

GRANT ALL PRIVILEGES ON DATABASE storefront TO admin;
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO admin;
```

4. Run the migrations with `db-migrate up`
5. Run the tests with Jest with `npm run test`
6. Start the server with `npm start`

### Environment Variables

As it is not in good practice to store passwords in the code, I use environment variables. You can set them in a `.env` file in the root directory. The following variables are required:

```
POSTGRES_URL = localhost
POSTGRES_PORT = 5432
POSTGRES_DB = udacity_project_2
POSTGRES_TEST_DB = udacity_project_2_test
POSTGRES_USER = test_user
POSTGRES_PASSWORD = 12345678
NODE_ENV = dev
EXPRESS_PORT = 3000
BCRYPT_PASSWORD = itsasecret
SALT_ROUNDS = 10
TOKEN_SECRET = itsasecrettoo
```
