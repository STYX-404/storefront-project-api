import express, { Request, Response } from 'express';
import user_routes from './handlers/user_handler';
import product_routes from './handlers/product_handler';
import orders_routes from './handlers/order_handler';
import 'express-async-errors';

const app = express();
app.use(express.json());

user_routes(app);
product_routes(app);
orders_routes(app);

app.get('/', (req: Request, res: Response): void => {
  res.send('Welcome to the home page!');
});

app.all('*', async (req: Request, res: Response) => {
  res.status(404).send('Not Found!');
});

export default app;
