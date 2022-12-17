"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = jsonwebtoken_1.default.sign({ user: { id: 1 } }, process.env.TOKEN_SECRET);
describe("Product Routes handling", () => {
    it("should have a index route", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/products");
        expect(response.status).toBe(200);
    });
    it("should have a show route", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/products/1");
        expect(response.status).toEqual(200);
    });
    it("Unauthorized to create product without a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default).post("/products");
        expect(response.status).toEqual(401);
    });
});
describe("Product Routes handling with token authorization", () => {
    it("Create product with a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/products")
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "test product", price: 10 });
        expect(response.status).toEqual(200);
    });
});
