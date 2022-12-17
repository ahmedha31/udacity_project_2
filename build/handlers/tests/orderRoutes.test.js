"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const order_1 = require("../../models/order");
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = jsonwebtoken_1.default.sign({ user: { id: 1 } }, process.env.TOKEN_SECRET);
const store = new order_1.OrderStore();
beforeAll(async () => {
    process.env.NODE_ENV = "test";
});
describe("Order Routes handling", () => {
    it("Unauthorized to get index route without a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/orders");
        expect(response.status).toBe(401);
    });
    it("Unauthorized to get order route without a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/orders/1");
        expect(response.status).toEqual(401);
    });
    it("Unauthorized to get user order without a token", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/orders/1/users");
        expect(response.status).toEqual(401);
    });
    it("Unauthorized to create order without a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default).post("/orders");
        expect(response.status).toEqual(401);
    });
    it("Unauthorized to add product to order without a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default).post("/orders/1/products");
        expect(response.status).toEqual(401);
    });
});
describe("Order Routes handling with token authorization", () => {
    it("Get index route with a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/orders")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it("Get order route with a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/orders/1")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
    it("Get user order with a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/orders/1/users")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
    it("Create order with a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/orders")
            .set("Authorization", `Bearer ${token}`)
            .send({
            status: "active",
            userId: 1,
        });
        expect(response.status).toEqual(200);
    });
    it("Add product to order with a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
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
