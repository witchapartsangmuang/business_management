import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
export const db = new Pool({
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT) || 5432,
  user: String(process.env.DB_USER),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME)
})