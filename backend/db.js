import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "Task_Manager",
  password: process.env.DB_PASSWORD || "1234",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});
pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});
export default pool;