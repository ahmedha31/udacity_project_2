CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id)
);

INSERT INTO orders (status, userId) VALUES ('complete', 1);