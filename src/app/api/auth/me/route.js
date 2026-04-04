import { NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth.server";

export async function GET(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const valid = verifyToken(token);
  return NextResponse.json({ isAdmin: valid });
}
