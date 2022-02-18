import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const verifyAuthToken = (req: Request, res: Response, next: any) => {
  try {
    jwt.verify(req.body.token, process.env.JWT_KEY as Secret);
    next();
  } catch (error) {
    res.status(401);
    res.send("Access denied, invalid token!");
  }
};

export default verifyAuthToken;
