/**
 * Server-side auth utilities (Node.js runtime only — do NOT import in middleware)
 */
import { createHmac, timingSafeEqual, randomBytes } from "crypto";

const SECRET = process.env.ADMIN_SESSION_SECRET ?? "change-me";
const EXPIRY_MS = 8 * 60 * 60 * 1000; // 8 hours

export const COOKIE_NAME = "admin_token";
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: EXPIRY_MS / 1000,
};

export function createToken() {
  const expiry = String(Date.now() + EXPIRY_MS);
  const rand = randomBytes(16).toString("hex");
  const payload = `${expiry}:${rand}`;
  const sig = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export function verifyToken(token) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [encodedPayload, sig] = parts;
  try {
    const payload = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const expected = createHmac("sha256", SECRET)
      .update(payload)
      .digest("base64url");
    const sigBuf = Buffer.from(sig, "base64url");
    const expectedBuf = Buffer.from(expected, "base64url");
    if (sigBuf.length !== expectedBuf.length) return false;
    if (!timingSafeEqual(sigBuf, expectedBuf)) return false;
    const expiry = Number(payload.split(":")[0]);
    return expiry > Date.now();
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  // Constant-time comparison
  const a = Buffer.from(password ?? "");
  const b = Buffer.from(adminPassword);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
