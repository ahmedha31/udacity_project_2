"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM orders WHERE id=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }
    async showUserOrders(userid) {
        try {
            const sql = "SELECT * FROM orders WHERE userid=($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userid]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not find order ${userid}. Error: ${err}`);
        }
    }
    async create(o) {
        try {
            const sql = "INSERT INTO orders (status, userid) VALUES($1, $2) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [o.status, o.userid]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (err) {
            throw new Error(`Could not add new order ${o.id}. Error: ${err}`);
        }
    }
    async addProduct(op) {
        try {
            const sql = "INSERT INTO cartproducts (orderId, productId, quantity) VALUES($1, $2, $3) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [
                op.orderId,
                op.productId,
                op.quantity,
            ]);
            const orderProduct = result.rows[0];
            conn.release();
            return orderProduct;
        }
        catch (err) {
            throw new Error(`Could not add new order product ${op.id}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
