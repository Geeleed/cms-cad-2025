/**
 * One-time migration: flatten price object {min, max, currency} → price string
 * Affects all resources of type "page_doctor"
 *
 * Run: node --env-file=.env.local scripts/migrate_price_to_string.js
 */
import pg from "pg";

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function formatPrice({ min, max, currency }) {
  if (min === max) return `${min} ${currency}`;
  return `${min} - ${max} ${currency}`;
}

/** Walk tree and convert content.price object → string in-place */
function walkAndFlatten(node) {
  if (node.content && typeof node.content === "object" && !Array.isArray(node.content)) {
    const p = node.content.price;
    if (p && typeof p === "object" && "currency" in p) {
      node.content.price = formatPrice(p);
      // remove stale price_label if exists
      delete node.content.price_label;
    }
  }
  if (Array.isArray(node.child)) {
    for (const c of node.child) walkAndFlatten(c);
  }
}

async function run() {
  const conn = await pool.connect();
  try {
    const { rows } = await conn.query(
      "SELECT id_resource, name, resource FROM cadcenter.cad__resource WHERE resource_type = 'page_doctor'"
    );

    if (rows.length === 0) {
      console.log("No page_doctor resources found.");
      return;
    }

    for (const row of rows) {
      const resource = row.resource;
      walkAndFlatten(resource);
      await conn.query(
        "UPDATE cadcenter.cad__resource SET resource = $1 WHERE id_resource = $2",
        [JSON.stringify(resource), row.id_resource]
      );
      console.log(`[updated] ${row.name}`);
    }
    console.log("Done.");
  } finally {
    conn.release();
    await pool.end();
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
