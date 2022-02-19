import { ProductsStore } from "../../models/product_model";
const store = new ProductsStore();

describe("Products model", () => {
  it("create method should add a new product", async () => {
    const result = await store.create({
      name: "iphone",
      price: 100,
    });

    delete result.id;
    expect(result).toEqual({
      name: "iphone",
      price: 100,
    });
  });

  it("index method should return a list of products", async () => {
    const create = await store.create({
      name: "gaming-pc",
      price: 900,
    });
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "iphone",
        price: 100,
      },
      {
        id: 2,
        name: "gaming-pc",
        price: 900,
      },
    ]);
  });

  it("show method should return one product by id", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: 1,
      name: "iphone",
      price: 100,
    });
  });
});
