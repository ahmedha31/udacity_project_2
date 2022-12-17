import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

let {
  POSTGRES_URL,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  NODE_ENV,
} = process.env;



let client = new Pool({
  host: POSTGRES_URL,
  database:  NODE_ENV==="dev" ? POSTGRES_DB : POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
