import request from "supertest";
import { OrderStore } from "../../models/order";
import app from "../../server";
import { Server } from "http";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const token = jwt.sign({ user: { id: 1 } }, process.env.TOKEN_SECRET as Secret);
const store = new OrderStore();
let server: Server;

beforeAll(async () => {
  jest.resetModules();
  process.env.NODE_ENV = "test";
});

afterAll(async () => {
  server.close();
});

describe("Order Routes handling", () => {
  server = app.listen();

  it("Unauthorized to get index route without a valid token", async () => {
    const response = await request(server).get("/orders");
    expect(response.status).toBe(401);
  });

  it("Unauthorized to get order route without a valid token", async () => {
    const response = await request(server).get("/orders/1");
    expect(response.status).toEqual(401);
  });

  it("Unauthorized to get user order without a token", async () => {
    const response = await request(server).get("/orders/1/users");
    expect(response.status).toEqual(401);
  });

  it("Unauthorized to create order without a valid token", async () => {
    const response = await request(server).post("/orders");
    expect(response.status).toEqual(401);
  });

  it("Unauthorized to add product to order without a valid token", async () => {
    const response = await request(server).post("/orders/1/products");
    expect(response.status).toEqual(401);
  });
});

describe("Order Routes handling with token authorization", () => {
  it("Get index route with a valid token", async () => {
    const response = await request(server)
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("Get order route with a valid token", async () => {
    const response = await request(server)
      .get("/orders/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it("Get user order with a valid token", async () => {
    const response = await request(server)
      .get("/orders/1/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it("Create order with a valid token", async () => {
    const response = await request(server)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: "active",
        userId: 1,
      });
    expect(response.status).toEqual(200);
  });

  it("Add product to order with a valid token", async () => {
    const response = await request(server)
      .post("/orders/1/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        quantity: 1,
        orderId: 1,
        productId: 1,
      });
    expect(response.status).toEqual(200);
  });
});
