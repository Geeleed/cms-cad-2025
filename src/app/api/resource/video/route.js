import { NextResponse } from "next/server";
import pool from "@/config/db";

export async function GET() {
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "SELECT resource FROM cad__resource WHERE resource_type = $1 AND name = $2",
      ["resource_video", "video"]
    );
    return NextResponse.json(result.rows[0]?.resource ?? {});
  } catch (error) {
    console.error("GET /api/resource/video error:", error);
    return NextResponse.json({}, { status: 500 });
  } finally {
    conn.release();
  }
}
