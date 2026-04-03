import { NextResponse } from "next/server";
import video from "@/static_json/video.json";

export async function GET() {
  return NextResponse.json(video);
}
