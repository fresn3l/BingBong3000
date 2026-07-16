import { NextResponse } from "next/server";
import {
  createLocalSession,
  verifyLocalPassword,
} from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/content/repository";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || "").trim();
  const password = String(body.password || "");

  if (isSupabaseConfigured() && email) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const sb = await createClient();
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      return NextResponse.json({ ok: true, mode: "supabase" });
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Auth failed" },
        { status: 500 },
      );
    }
  }

  if (!verifyLocalPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await createLocalSession();
  return NextResponse.json({ ok: true, mode: "local" });
}
