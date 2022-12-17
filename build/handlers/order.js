"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err.message);
    }
};
const show = async (req, res) => {
    try {
        const order = await store.show(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const showUserOrders = async (req, res) => {
    try {
        const orders = await store.showUserOrders(req.params.id);
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const order = {
            status: req.body.status,
            userid: req.body.userid,
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProduct = async (req, res) => {
    const orderProduct = {
        quantity: req.body.quantity,
        orderId: req.body.orderId,
        productId: req.body.productId,
    };
    try {
        const newOrderProduct = await store.addProduct(orderProduct);
        res.json(newOrderProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const order_routes = (app) => {
    app.get("/orders", verifyToken_1.default, index);
    app.get("/orders/:id", verifyToken_1.default, show);
    app.get("/orders/:id/users", verifyToken_1.default, showUserOrders);
    app.post("/orders", verifyToken_1.default, create);
    // add product
    app.post("/orders/:id/products", verifyToken_1.default, addProduct);
};
exports.default = order_routes;
