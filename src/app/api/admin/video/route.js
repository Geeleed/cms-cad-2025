import { NextResponse } from "next/server";
import pool from "@/config/db";

const RESOURCE_TYPE = "resource_video";
const RESOURCE_NAME = "video";

// GET /api/admin/video
export async function GET() {
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "SELECT resource FROM cadcenter.cad__resource WHERE resource_type=$1 AND name=$2",
      [RESOURCE_TYPE, RESOURCE_NAME]
    );
    return NextResponse.json(result.rows[0]?.resource ?? { content: { en: "Educational Videos", th: null }, id: 1, child: [] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  } finally {
    conn.release();
  }
}

// PUT /api/admin/video — replace entire video resource
export async function PUT(request) {
  const body = await request.json();
  const conn = await pool.connect();
  try {
    await conn.query(
      `UPDATE cadcenter.cad__resource SET resource=$1 WHERE resource_type=$2 AND name=$3`,
      [JSON.stringify(body), RESOURCE_TYPE, RESOURCE_NAME]
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  } finally {
    conn.release();
  }
}
