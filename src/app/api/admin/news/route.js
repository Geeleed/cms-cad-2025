import { NextResponse } from "next/server";
import pool from "@/config/db";

// GET /api/admin/news
export async function GET() {
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "SELECT * FROM cadcenter.news ORDER BY id DESC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  } finally {
    conn.release();
  }
}

// POST /api/admin/news — create news item
export async function POST(request) {
  const { img_src, title, date, href } = await request.json();
  if (!title || !href) {
    return NextResponse.json({ error: "title and href are required" }, { status: 400 });
  }
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "INSERT INTO cadcenter.news (img_src, title, date, href) VALUES ($1, $2, $3, $4) RETURNING *",
      [img_src ?? "", title, date ?? "", href]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  } finally {
    conn.release();
  }
}
