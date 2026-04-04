import { Pool } from "pg";
import { parse } from "pg-connection-string";

const config = parse(process.env.DATABASE_URL);

const pool = new Pool({
  ...config,
  ssl: { rejectUnauthorized: true }, // sslmode=verify-full: encrypt + verify hostname
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 10,
  family: 4,
});

// Set search_path and statement_timeout on each new connection
pool.on("connect", async (client) => {
  await client.query("SET search_path TO cadcenter, public");
  await client.query("SET statement_timeout = '8000'");
});

export default pool;
