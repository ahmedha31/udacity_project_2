CREATE TABLE cartProducts (
    id SERIAL PRIMARY KEY,
    quantity integer,
    productId integer REFERENCES products(id),
    orderId integer REFERENCES orders(id)
);