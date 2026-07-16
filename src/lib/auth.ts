import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";
import { isSupabaseConfigured } from "@/lib/content/repository";

const COOKIE_NAME = "bb_admin_session";

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export async function createLocalSession() {
  const secret = process.env.ADMIN_SESSION_SECRET || "dev-session-secret";
  const token = hash(`${secret}:${Date.now()}:${Math.random()}`);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  // Store expected hash companion cookie for verification
  cookieStore.set(`${COOKIE_NAME}_sig`, hash(`${token}:${secret}`), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearLocalSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  cookieStore.delete(`${COOKIE_NAME}_sig`);
}

export async function hasLocalSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const sig = cookieStore.get(`${COOKIE_NAME}_sig`)?.value;
  if (!token || !sig) return false;
  const secret = process.env.ADMIN_SESSION_SECRET || "dev-session-secret";
  const expected = hash(`${token}:${secret}`);
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function verifyLocalPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "changeme";
  const a = hash(password);
  const b = hash(expected);
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const sb = await createClient();
      const { data } = await sb.auth.getUser();
      if (data.user) return true;
    } catch {
      // fall through to local session
    }
  }
  return hasLocalSession();
}

export { COOKIE_NAME };
