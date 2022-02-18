import client from "../database";
import dotenv from "dotenv";

dotenv.config();

export type Order = {
  status: string;
  userId: number;
};

export class OrderStore {
  async index() {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }

  async show(orederId: string) {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id =$1;";
      const result = await conn.query(sql, [orederId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }
  async create(order: Order) {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
      const result = await conn.query(sql, [order.status, order.userId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }

  async addProduct(orderId: string, productId: string, quantity: number) {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [orderId, productId, quantity]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }
}
