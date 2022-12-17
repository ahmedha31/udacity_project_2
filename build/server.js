"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const order_1 = __importDefault(require("./handlers/order"));
const product_1 = __importDefault(require("./handlers/product"));
const user_1 = __importDefault(require("./handlers/user"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const port = process.env.EXPRESS_PORT;
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("Server is up and running!");
});
(0, order_1.default)(app);
(0, product_1.default)(app);
(0, user_1.default)(app);
if (process.env.NODE_ENV !== "test") {
    app.listen(port, function () {
        console.log(`starting app on: ${address}`);
    });
}
exports.default = app;
