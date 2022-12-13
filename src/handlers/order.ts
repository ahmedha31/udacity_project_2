import express, { Request, Response } from "express";
import { Order, OrderProduct, OrderStore } from "../models/order";
import verifyAuthToken from "../middleware/verifyToken";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await store.showUserOrders(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      userId: req.body.userId,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderProduct: OrderProduct = {
    quantity: req.body.quantity,
    orderId: req.body.orderId,
    productId: req.body.productId,
  };
  try {
    const newOrderProduct = await store.addProduct(orderProduct);
    res.json(newOrderProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const order_routes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.get("/orders/:id/users", verifyAuthToken, showUserOrders);
  app.post("/orders", verifyAuthToken, create);
  // add product
  app.post("/orders/:id/products", verifyAuthToken, addProduct);
};

export default order_routes;
