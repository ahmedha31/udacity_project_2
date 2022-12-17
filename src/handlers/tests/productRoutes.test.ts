import request from "supertest";
import app from "../../server";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const token = jwt.sign({ user: { id: 1 } }, process.env.TOKEN_SECRET as Secret);


describe("Product Routes handling", () => {

  it("should have a index route", async () => {
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
  });

  it("should have a show route", async () => {
    const response = await request(app).get("/products/1");
    expect(response.status).toEqual(200);
  });

  it("Unauthorized to create product without a valid token", async () => {
    const response = await request(app).post("/products");
    expect(response.status).toEqual(401);
  });
});

describe("Product Routes handling with token authorization", () => {
  it("Create product with a valid token", async () => {
    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "test product", price: 10 });
    expect(response.status).toEqual(200);
  });
});
