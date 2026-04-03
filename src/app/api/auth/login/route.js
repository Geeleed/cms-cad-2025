import { NextResponse } from "next/server";
import {
  verifyAdminPassword,
  createToken,
  COOKIE_NAME,
  COOKIE_OPTIONS,
} from "@/lib/auth.server";

export async function POST(request) {
  const { password } = await request.json();
  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  const token = createToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS);
  return response;
}
