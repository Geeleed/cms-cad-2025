import { NextResponse } from "next/server";

const COOKIE_NAME = "admin_token";
const SECRET = process.env.ADMIN_SESSION_SECRET ?? "change-me";

async function verifyToken(token) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [encodedPayload, sig] = parts;
  try {
    const payload = atob(encodedPayload.replace(/-/g, "+").replace(/_/g, "/"));
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    // Convert base64url sig to ArrayBuffer
    const sigBinary = atob(sig.replace(/-/g, "+").replace(/_/g, "/"));
    const sigBytes = Uint8Array.from(sigBinary, (c) => c.charCodeAt(0));
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      encoder.encode(payload)
    );
    if (!valid) return false;
    const expiry = Number(payload.split(":")[0]);
    return expiry > Date.now();
  } catch {
    return false;
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only guard /[locale]/admin/* paths
  const adminMatch = pathname.match(/^\/([a-z]{2})\/admin(\/.*)?$/);
  if (!adminMatch) return NextResponse.next();

  const locale = adminMatch[1];
  const subPath = adminMatch[2] ?? "";

  // Allow login page through
  if (subPath === "/login" || subPath.startsWith("/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const valid = await verifyToken(token);

  if (!valid) {
    const loginUrl = new URL(`/${locale}/admin/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:locale/admin/:path*"],
};
