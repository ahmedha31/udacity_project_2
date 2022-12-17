CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    userid INT,
    FOREIGN KEY (userid) REFERENCES users(id)
);

INSERT INTO orders (status, userid) VALUES ('complete', 1);