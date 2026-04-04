import { NextResponse } from "next/server";
import pool from "@/config/db";

export async function POST(request) {
  const { locale } = await request.json();
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "SELECT resource FROM cad__resource WHERE resource_type = $1 AND name = $2",
      ["value_setting", `value_setting_${locale}`]
    );
    const res = result.rows[0]?.resource;
    if (!res) return NextResponse.json({}, { status: 404 });
    const { contacts, address, map, footer } = res;
    return NextResponse.json({ address, contacts: contacts || [], footer, map });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  } finally {
    conn.release();
  }
}
