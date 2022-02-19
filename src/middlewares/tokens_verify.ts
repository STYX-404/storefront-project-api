import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: any) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_KEY as Secret);

    next();
  } catch (error) {
    res.status(401);
    res.send('Access denied, invalid token!');
  }
};

export default verifyAuthToken;
