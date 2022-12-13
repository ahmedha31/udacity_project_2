import request from "supertest";
import app from "../../server";
import { Server } from "http";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const token = jwt.sign({ user: { id: 1 } }, process.env.TOKEN_SECRET as Secret);
let server: Server;

beforeAll(async () => {
  jest.resetModules();
  process.env.NODE_ENV = "test";
});

afterAll(async () => {
  server.close();
});

describe("User Routes handling", () => {
  server = app.listen();

  it("Unauthorized to access users without a valid token", async () => {
    const response = await request(server).get("/users");
    expect(response.status).toEqual(401);
  });

  it("Unauthorized to access user without a valid token", async () => {
    const response = await request(server).get("/users/1");
    expect(response.status).toEqual(401);
  });

  it("Should create a new user", async () => {
    const response = await request(server).post("/users").send({
      first_name: "test",
      last_name: "user",
      password: "password",
    });
    expect(response.status).toEqual(200);
  });

  it("Should authenticate a user", async () => {
    const response = await request(server).get("/user/authenticate").send({
      id: "1",
      password: "password",
    });
    expect(response.status).toEqual(200);
  });
});

describe("User Routes handling with token authorization", () => {
  it("Should access users with a valid token", async () => {
    const response = await request(server)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it("Should access user with a valid token", async () => {
    const response = await request(server)
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
});
