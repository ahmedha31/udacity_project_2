# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index - GET /products
- Show - GET /products/:id
- Create [token required] - POST /products

#### Users

- Index [token required] - GET /users
- Show [token required] - GET /users/:id
- Create [token required] - POST /users

#### Orders

- Current Order by user (args: user id)[token required] - GET /orders
- Show [token required] - GET /orders/:id
- Show order by current user [token required] - GET /orders/:id/users
- Create [token required] - POST /orders
- Add product to order [token required] - POST /orders/:id/products

## Database Schema

#### Product

- id - serial primary key
- name - varchar(50)
- price - integer

#### User

- id - serial primary key
- firstName - varchar(30)
- lastName - varchar(30)
- password - varchar

#### Orders

- id - serial primary key
- user_id - integer foreign key to users table
- status of order (active or complete) - varchar(10)

#### Order Products

- id - serial primary key
- order_id - integer foreign key to orders table
- product_id - integer foreign key to products table
- quantity - integer
