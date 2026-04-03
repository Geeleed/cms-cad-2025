import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const { Pool } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const migrations = [
  "001_create_cadcenter_schema.sql",
  "002_add_news_table.sql",
  "003_create_articles_table.sql",
];

async function runMigrations() {
  const conn = await pool.connect();
  try {
    // Create migrations tracking table in cadcenter schema if it doesn't exist yet
    await conn.query(`
      CREATE TABLE IF NOT EXISTS public.cadcenter_migrations (
        id         SERIAL PRIMARY KEY,
        filename   VARCHAR(255) UNIQUE NOT NULL,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    for (const filename of migrations) {
      const { rows } = await conn.query(
        "SELECT id FROM public.cadcenter_migrations WHERE filename = $1",
        [filename]
      );
      if (rows.length > 0) {
        console.log(`[skip] ${filename} already applied`);
        continue;
      }

      console.log(`[run]  ${filename}`);
      const sql = readFileSync(
        join(__dirname, "../migrations", filename),
        "utf8"
      );

      await conn.query("BEGIN");
      try {
        await conn.query(sql);
        await conn.query(
          "INSERT INTO public.cadcenter_migrations (filename) VALUES ($1)",
          [filename]
        );
        await conn.query("COMMIT");
        console.log(`[done] ${filename}`);
      } catch (err) {
        await conn.query("ROLLBACK");
        throw err;
      }
    }

    console.log("All migrations complete.");
  } finally {
    conn.release();
    await pool.end();
  }
}

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
