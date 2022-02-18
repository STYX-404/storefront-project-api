import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order_model";
import dotenv from "dotenv";
import verifyAuthToken from "../middlewares/tokens_verify";

dotenv.config();

const store = new OrderStore();

// INDEX function() -> show all users in database

const index = async (req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

// SHOW function() -> show one users from database by his id

const show = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const order = await store.show(orderId);
  res.json(order);
};

// CREATE function() ->create a new user in database

const create = async (req: Request, res: Response) => {
  const order: Order = {
    status: req.body.status,
    userId: req.body.user_id,
  };
  const newOrder = await store.create(order);
  res.json(newOrder);
};

const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.id;
  const quantity: number = req.body.id;
  const addedProduct = await store.addProduct(orderId, productId, quantity);
  res.json(addedProduct);
};

const orders_routes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", create);
  app.post("/orders/:id/products", addProduct);
  //   app.post("/orders", verifyAuthToken, create);
  //   app.post("/orders/:id/products", verifyAuthToken, create);
};

export default orders_routes;
