import { NextResponse } from "next/server";
import pool from "@/config/db";
import { verifyToken, COOKIE_NAME } from "@/lib/auth.server";

function isAuthorized(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return verifyToken(token);
}

// GET /api/admin/resource/[id] — get full resource with data
export async function GET(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "SELECT * FROM cad__resource WHERE id_resource = $1",
      [id]
    );
    if (!result.rows[0]) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  } finally {
    conn.release();
  }
}

// PUT /api/admin/resource/[id] — update resource content
export async function PUT(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { resource, remark } = await request.json();
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "UPDATE cad__resource SET resource = $1, remark = $2 WHERE id_resource = $3 RETURNING *",
      [JSON.stringify(resource), remark ?? "", id]
    );
    if (!result.rows[0]) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  } finally {
    conn.release();
  }
}
