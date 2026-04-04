import { NextResponse } from "next/server";
import pool from "@/config/db";

export async function GET() {
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "SELECT id, img_src AS \"imgSrc\", title, date, href FROM cadcenter.news ORDER BY id DESC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/news error:", error);
    return NextResponse.json([], { status: 500 });
  } finally {
    conn.release();
  }
}
