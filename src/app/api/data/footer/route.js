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
    const {
      facebook_label, facebook_link,
      line_label, line_link,
      email_label, email_link,
      tel_label, tel_link,
      address, map, footer,
    } = res;
    const contact = {
      facebook_label, facebook_link,
      line_label, line_link,
      email_label, email_link,
      tel_label, tel_link,
    };
    return NextResponse.json({ address, contact, footer, map });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  } finally {
    conn.release();
  }
}
