/**
 * Seed script: inserts video and page content into cadcenter.cad__resource
 * from the existing static JSON files.
 * Run: npm run seed
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const { Pool } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));
const staticDir = join(__dirname, "../src/static_json");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function readJson(filename) {
  return JSON.parse(readFileSync(join(staticDir, filename), "utf8"));
}

// video is stored as a single resource entry
const videoSeeds = [
  { resource_type: "resource_video", name: "video", remark: "YouTube video list", resource: readJson("video.json") },
];

// each page slug stored with resource_type='page_content', name='{slug}_en'
const pageSlugs = ["home", "about", "approach", "contact", "doctor", "service", "team"];
const pageSeeds = pageSlugs.map((slug) => ({
  resource_type: "page_content",
  name: `${slug}_en`,
  remark: `Static page content for ${slug} (en)`,
  resource: readJson(`${slug}_en.json`),
}));

const seeds = [...videoSeeds, ...pageSeeds];

async function runSeed() {
  const conn = await pool.connect();
  try {
    for (const seed of seeds) {
      const { rows } = await conn.query(
        "SELECT id_resource FROM cadcenter.cad__resource WHERE resource_type = $1 AND name = $2",
        [seed.resource_type, seed.name]
      );
      if (rows.length > 0) {
        console.log(`[skip] ${seed.resource_type} / ${seed.name} already exists`);
        continue;
      }
      await conn.query(
        "INSERT INTO cadcenter.cad__resource (resource_type, name, remark, resource) VALUES ($1, $2, $3, $4)",
        [seed.resource_type, seed.name, seed.remark, JSON.stringify(seed.resource)]
      );
      console.log(`[done] ${seed.resource_type} / ${seed.name}`);
    }
    console.log("Seed complete.");
  } finally {
    conn.release();
    await pool.end();
  }
}

runSeed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
