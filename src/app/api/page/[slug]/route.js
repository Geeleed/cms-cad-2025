import { NextResponse } from "next/server";
import pool from "@/config/db";

const VALID_SLUGS = new Set(["home", "about", "approach", "contact", "doctor", "service", "team"]);

export async function GET(request, { params }) {
  const { slug } = await params;
  if (!VALID_SLUGS.has(slug)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const conn = await pool.connect();
  try {
    const [enResult, thResult] = await Promise.all([
      conn.query(
        "SELECT resource FROM cadcenter.cad__resource WHERE resource_type = $1 AND name = $2",
        ["page_content", `${slug}_en`]
      ),
      conn.query(
        "SELECT resource FROM cadcenter.cad__resource WHERE resource_type = $1 AND name = $2",
        ["page_content", `${slug}_th`]
      ),
    ]);
    return NextResponse.json({
      en: enResult.rows[0]?.resource ?? null,
      th: thResult.rows[0]?.resource ?? null,
    });
  } catch (error) {
    console.error(`GET /api/page/${slug} error:`, error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  } finally {
    conn.release();
  }
}
