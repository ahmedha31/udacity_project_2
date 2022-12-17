import { Order, OrderProduct, OrderStore } from "../order";

const store = new OrderStore();

const testOrder: Order = {
  status: "active",
  userid: 1,
};

const testOrderProduct: OrderProduct = {
  orderId: 1,
  productId: 1,
  quantity: 5,
};

describe("Order Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a showUserOrders method", () => {
    expect(store.showUserOrders).toBeDefined();
  });

  it("should have a addProduct method", () => {
    expect(store.addProduct).toBeDefined();
  });

  it("create method should add a order", async () => {
    const result = await store.create(testOrder);
    expect(result).toBeDefined();
  });

  it("show method should return the correct order", async () => {
    const result = await store.show("1");
    console.log(result);
    expect(result).toEqual({
      id: 1,
      status: "complete",
      userid: 1,
    });
  });

  it("index method should return a list of orders", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it("showUserOrders method should return a list of orders for the user", async () => {
    const result = await store.showUserOrders("1");
    expect(result.length).toBeGreaterThan(0);
  });

  it("addProduct method should add a product to an order", async () => {
    const result = await store.addProduct(testOrderProduct);
    expect(result).toBeDefined();
  });
});
