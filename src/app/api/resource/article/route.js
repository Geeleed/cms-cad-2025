import { NextResponse } from "next/server";
import pool from "@/config/db";

export async function GET() {
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "SELECT id_article, title, description, created_at FROM cadcenter.articles ORDER BY created_at DESC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/resource/article error:", error);
    return NextResponse.json([], { status: 500 });
  } finally {
    conn.release();
  }
}

export async function POST(request) {
  const { title, description, content } = await request.json();
  if (!title || !content) {
    return NextResponse.json({ auth: true, data: null, error: "title and content required" }, { status: 400 });
  }
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "INSERT INTO cadcenter.articles (title, description, content) VALUES ($1, $2, $3) RETURNING *",
      [title, description ?? "", content]
    );
    return NextResponse.json({ auth: true, data: result.rows[0] });
  } catch (error) {
    console.error("POST /api/resource/article error:", error);
    return NextResponse.json({ auth: false, error: "database error" }, { status: 500 });
  } finally {
    conn.release();
  }
}
