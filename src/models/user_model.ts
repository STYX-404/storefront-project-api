import client from "../database";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  firstname: string;
  lastname: string;
  password: string;
};

export class UsersStore {
  async index() {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }

  async show(userId: string) {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id =$1;";
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }

  async create(user: User) {
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *";
      const pepper = BCRYPT_PASSWORD;
      const saltRounds = SALT_ROUNDS as unknown as string;
      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        hash,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    }
  }
}
