import express, { Request, Response, NextFunction } from "express";
import { User, UsersStore } from "../models/user_model";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import verifyAuthToken from "../middlewares/tokens_verify";

dotenv.config();

const store = new UsersStore();

// INDEX function() -> show all users in database

const index = async (req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

// SHOW function() -> show one users from database by his id

const show = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await store.show(userId);
  res.json(user);
};

// CREATE function() ->create a new user in database

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  const newUser = await store.create(user);
  const token = jwt.sign({ user: newUser }, process.env.JWT_KEY as Secret);
  res.json({
    newUser,
    token: token,
  });
};

const user_routes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", verifyAuthToken, create);
};

export default user_routes;
