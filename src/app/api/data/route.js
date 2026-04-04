import { NextResponse } from "next/server";
import pool from "@/config/db";

export async function POST(request) {
  const { resource_type, name } = await request.json();
  let conn;
  try {
    conn = await pool.connect();
    await conn.query("BEGIN");
    const result = await conn.query(
      "SELECT * FROM cadcenter.cad__resource WHERE resource_type = $1 AND name = $2",
      [resource_type, name]
    );
    await conn.query("COMMIT");
    return NextResponse.json(result.rows[0] ?? {});
  } catch (error) {
    await conn?.query("ROLLBACK");
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  } finally {
    conn?.release();
  }
}
