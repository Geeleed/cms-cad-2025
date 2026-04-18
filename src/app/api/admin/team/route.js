import { NextResponse } from "next/server";
import pool from "@/config/db";
import { verifyToken, COOKIE_NAME } from "@/lib/auth.server";

const RESOURCE_TYPE = "page_team";
const NAME_EN = "page_team_en";
const NAME_TH = "page_team_th";

function isAuthorized(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return verifyToken(token);
}

// GET /api/admin/team
// Returns { en_id, th_id, en_resource, th_resource }
export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const conn = await pool.connect();
  try {
    const result = await conn.query(
      "SELECT id_resource, name, resource FROM cadcenter.cad__resource WHERE resource_type = $1 AND name = ANY($2)",
      [RESOURCE_TYPE, [NAME_EN, NAME_TH]]
    );
    const en = result.rows.find((r) => r.name === NAME_EN);
    const th = result.rows.find((r) => r.name === NAME_TH);
    return NextResponse.json({
      en_id: en?.id_resource ?? null,
      th_id: th?.id_resource ?? null,
      en_resource: en?.resource ?? { title: "Our Team", team: [] },
      th_resource: th?.resource ?? { title: "ทีมงานของเรา", team: [] },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  } finally {
    conn.release();
  }
}

// PUT /api/admin/team
// Body: { en_id, th_id, en_resource, th_resource }
export async function PUT(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { en_id, th_id, en_resource, th_resource } = body;
  const conn = await pool.connect();
  try {
    await conn.query(
      "UPDATE cadcenter.cad__resource SET resource = $1 WHERE id_resource = $2",
      [JSON.stringify(en_resource), en_id]
    );
    await conn.query(
      "UPDATE cadcenter.cad__resource SET resource = $1 WHERE id_resource = $2",
      [JSON.stringify(th_resource), th_id]
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  } finally {
    conn.release();
  }
}
