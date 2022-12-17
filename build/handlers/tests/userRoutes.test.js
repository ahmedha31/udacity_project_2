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
beforeAll(async () => {
    process.env.NODE_ENV = "test";
});
describe("User Routes handling", () => {
    it("Unauthorized to access users without a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/users");
        expect(response.status).toEqual(401);
    });
    it("Unauthorized to access user without a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/users/1");
        expect(response.status).toEqual(401);
    });
    it("Should create a new user", async () => {
        const response = await (0, supertest_1.default)(server_1.default).post("/users").send({
            first_name: "test",
            last_name: "user",
            password: "password",
        });
        expect(response.status).toEqual(200);
    });
    it("Should authenticate a user", async () => {
        const response = await (0, supertest_1.default)(server_1.default).get("/user/authenticate").send({
            id: "1",
            password: "password",
        });
        expect(response.status).toEqual(200);
    });
});
describe("User Routes handling with token authorization", () => {
    it("Should access users with a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/users")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
    it("Should access user with a valid token", async () => {
        const response = await (0, supertest_1.default)(server_1.default)
            .get("/users/1")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toEqual(200);
    });
});
