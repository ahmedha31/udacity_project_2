import { User, UserStore } from "../user";

const store = new UserStore();

const testUser: User = {
  first_name: "test",
  last_name: "user",
  password: "password",
};
beforeAll(async () => {
  process.env.NODE_ENV = "test";
});

describe("User Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have an authenticate method", () => {
    expect(store.authenticate).toBeDefined();
  });

  it("create method should add a user", async () => {
    const result = await store.create(testUser);
    expect(result.first_name).toEqual(testUser.first_name);
    expect(result.last_name).toEqual(testUser.last_name);
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it("show method should return the correct user", async () => {
    const result = await store.show("1");
    expect(result.first_name).toEqual("Francisco");
    expect(result.last_name).toEqual("Frias");
  });
});
