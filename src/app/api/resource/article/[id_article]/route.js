import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id_article } = await params;
  try {
    const res = await fetch(
      `https://mysql.geeleed.com/api.php?id_article=${id_article}`
    );
    const text = await res.text();
    const article = text ? JSON.parse(text) : null;
    return NextResponse.json(article);
  } catch (error) {
    console.error("GET /api/resource/article/[id_article] error:", error);
    return NextResponse.json(null, { status: 200 });
  }
}
