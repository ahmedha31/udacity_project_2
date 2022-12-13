import client from "../database";

export type Order = {
  id?: number;
  status: string;
  userId: number;
};

export type OrderProduct = {
  id?: number;
  orderId?: number;
  productId: number;
  quantity: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async showUserOrders(userId: string): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders WHERE userId=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${userId}. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (status, userId) VALUES($1, $2) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [o.status, o.userId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${o.id}. Error: ${err}`);
    }
  }

  async addProduct(op: OrderProduct): Promise<OrderProduct> {
    try {
      const sql =
        "INSERT INTO cartproducts (orderId, productId, quantity) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [
        op.orderId,
        op.productId,
        op.quantity,
      ]);
      const orderProduct = result.rows[0];
      conn.release();
      return orderProduct;
    } catch (err) {
      throw new Error(
        `Could not add new order product ${op.id}. Error: ${err}`
      );
    }
  }
}
