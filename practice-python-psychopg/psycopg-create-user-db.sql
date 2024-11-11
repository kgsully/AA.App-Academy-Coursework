-- This is really bad security and should not be done in real-world
-- application programming.
CREATE USER psycopg_test_user WITH CREATEDB PASSWORD 'password';

-- Must be run by itself
CREATE DATABASE psycopg_test_db WITH OWNER psycopg_test_user;
