import { NextResponse } from "next/server";

const EXTERNAL_API = "https://mysql.geeleed.com/api.php";
const PASSWORD_POST_ARTICLE = process.env.PASSWORD_POST_ARTICLE;

export async function GET() {
  try {
    const res = await fetch(EXTERNAL_API);
    const text = await res.text();
    const article = text ? JSON.parse(text) : [];
    return NextResponse.json(article);
  } catch (error) {
    console.error("GET /api/resource/article error:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request) {
  const payload = await request.json();
  const { password } = payload;
  if (password !== PASSWORD_POST_ARTICLE) {
    return NextResponse.json({ auth: false });
  }
  try {
    const res = await fetch(EXTERNAL_API, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    const article = text ? JSON.parse(text) : null;
    return NextResponse.json({ auth: true, data: article });
  } catch (error) {
    console.error("POST /api/resource/article error:", error);
    return NextResponse.json({ auth: true, data: null }, { status: 200 });
  }
}
