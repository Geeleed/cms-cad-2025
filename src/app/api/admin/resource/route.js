import { NextResponse } from "next/server";
import pool from "@/config/db";
import { verifyToken, COOKIE_NAME } from "@/lib/auth.server";

function isAuthorized(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return verifyToken(token);
}

// GET /api/admin/resource — list all resources
// GET /api/admin/resource?type=X&name=Y — get single resource with full data
export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const name = searchParams.get("name");

  const conn = await pool.connect();
  try {
    if (type && name) {
      const result = await conn.query(
        "SELECT * FROM cadcenter.cad__resource WHERE resource_type = $1 AND name = $2",
        [type, name]
      );
      if (!result.rows[0]) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json(result.rows[0]);
    }

    const result = await conn.query(
      "SELECT id_resource, resource_type, name, remark FROM cadcenter.cad__resource ORDER BY resource_type, name"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  } finally {
    conn.release();
  }
}
