import { NextResponse } from "next/server";
import pool from "@/config/db";

export async function POST(request) {
  const { resource_type, name } = await request.json();
  const conn = await pool.connect();
  try {
    await conn.query("BEGIN");
    const result = await conn.query(
      "SELECT * FROM cad__resource WHERE resource_type = $1 AND name = $2",
      [resource_type, name]
    );
    await conn.query("COMMIT");
    return NextResponse.json(result.rows[0] ?? {});
  } catch (error) {
    await conn.query("ROLLBACK");
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  } finally {
    conn.release();
  }
}
