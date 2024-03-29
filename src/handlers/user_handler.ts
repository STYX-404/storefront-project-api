import express, { Request, Response } from "express";
import { User, UsersStore } from "../models/user_model";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import verifyAuthToken from "../middlewares/tokens_verify";

dotenv.config();

const store = new UsersStore();

// INDEX function() -> show all users in database

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

// SHOW function() -> show one users from database by his id

const show = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await store.show(userId);
    res.json(user);
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

// CREATE function() ->create a new user in database

const create = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

const user_routes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
};

export default user_routes;
