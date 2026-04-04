import { NextResponse } from "next/server";
import pool from "@/config/db";
import { verifyToken, COOKIE_NAME } from "@/lib/auth.server";

function isAuthorized(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return verifyToken(token);
}

export async function GET(request, { params }) {
  const { id_article } = await params;
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "SELECT * FROM cadcenter.articles WHERE id_article = $1",
      [id_article]
    );
    if (!result.rows[0]) {
      return NextResponse.json(null, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("GET /api/resource/article/[id_article] error:", error);
    return NextResponse.json(null, { status: 500 });
  } finally {
    conn.release();
  }
}

export async function PUT(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ auth: false }, { status: 401 });
  }
  const { id_article } = await params;
  const { title, description, content } = await request.json();
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "UPDATE cadcenter.articles SET title=$1, description=$2, content=$3, updated_at=NOW() WHERE id_article=$4 RETURNING *",
      [title, description ?? "", content, id_article]
    );
    return NextResponse.json({ auth: true, data: result.rows[0] });
  } catch (error) {
    console.error("PUT /api/resource/article/[id_article] error:", error);
    return NextResponse.json({ auth: true, data: null }, { status: 500 });
  } finally {
    conn.release();
  }
}

export async function DELETE(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ auth: false }, { status: 401 });
  }
  const { id_article } = await params;
  const conn = await pool.connect();
  try {
    await conn.query("DELETE FROM cadcenter.articles WHERE id_article=$1", [id_article]);
    return NextResponse.json({ auth: true, ok: true });
  } catch (error) {
    console.error("DELETE /api/resource/article/[id_article] error:", error);
    return NextResponse.json({ auth: true, ok: false }, { status: 500 });
  } finally {
    conn.release();
  }
}

