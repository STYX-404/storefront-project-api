import client from '../database';

export type Product = {
  name: string;
  price: number;
};

export class ProductsStore {
  async index() {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products;';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }

  async show(productId: string) {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id =$1;';
      const result = await conn.query(sql, [productId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }
  async create(product: Product) {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [product.name, product.price]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }
}
