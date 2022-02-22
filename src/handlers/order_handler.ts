import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order_model";
import dotenv from "dotenv";
import verifyAuthToken from "../middlewares/tokens_verify";

dotenv.config();

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const order = await store.show(orderId);
    res.json(order);
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const orderId: string = req.params.id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const addedProduct = await store.addProduct(orderId, productId, quantity);
    res.json(addedProduct);
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

const orders_routes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, create);
  app.post("/orders/:id/products", verifyAuthToken, addProduct);
};

export default orders_routes;
