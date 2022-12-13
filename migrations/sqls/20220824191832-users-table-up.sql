CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    password VARCHAR
);

INSERT INTO users (first_name, last_name, password) VALUES ('Francisco', 'Frias', 'cisco123');