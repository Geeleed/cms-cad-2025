import { NextResponse } from "next/server";
import news from "@/static_json/news.json";

export async function GET() {
  return NextResponse.json(news);
}
