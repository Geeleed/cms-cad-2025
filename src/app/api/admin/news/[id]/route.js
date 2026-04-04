import { NextResponse } from "next/server";
import pool from "@/config/db";

// PUT /api/admin/news/[id]
export async function PUT(request, { params }) {
  const { id } = await params;
  const { img_src, title, date, href } = await request.json();
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "UPDATE cadcenter.news SET img_src=$1, title=$2, date=$3, href=$4 WHERE id=$5 RETURNING *",
      [img_src ?? "", title, date ?? "", href, id]
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

// DELETE /api/admin/news/[id]
export async function DELETE(request, { params }) {
  const { id } = await params;
  const conn = await pool.connect();
  try {
    await conn.query("DELETE FROM cadcenter.news WHERE id=$1", [id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  } finally {
    conn.release();
  }
}
