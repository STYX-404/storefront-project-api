import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { DB_HOST, DB_NAME, DB_USERNAME, DB_TEST_NAME, DB_PASSWORD, NODE_ENV } =
  process.env;

let client: Pool = new Pool({});
console.log(NODE_ENV);


if (NODE_ENV === "dev") {
  client = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
  });
}
if (NODE_ENV === "test") {
  client = new Pool({
    host: DB_HOST,
    database: DB_TEST_NAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
  });
}
export default client;
