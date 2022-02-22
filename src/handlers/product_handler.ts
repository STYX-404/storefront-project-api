import express, { Request, Response } from "express";
import { Product, ProductsStore } from "../models/product_model";
import verifyAuthToken from "../middlewares/tokens_verify";

const store = new ProductsStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const productsId = req.params.id;
    const product = await store.show(productsId);
    res.json(product);
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
};

export default product_routes;
