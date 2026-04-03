import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Set search_path so queries can reference tables without schema prefix
pool.on("connect", (client) => {
  client.query("SET search_path TO cadcenter, public");
});

export default pool;
