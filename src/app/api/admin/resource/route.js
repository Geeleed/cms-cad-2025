import { NextResponse } from "next/server";
import pool from "@/config/db";

// GET /api/admin/resource — list all resources
export async function GET() {
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "SELECT id_resource, resource_type, name, remark FROM cad__resource ORDER BY resource_type, name"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  } finally {
    conn.release();
  }
}
