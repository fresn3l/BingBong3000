import { NextResponse } from "next/server";
import {
  allowLocalAdmin,
  createLocalSession,
  requireSupabaseInProduction,
  verifyLocalPassword,
} from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/content/repository";

export async function POST(request: Request) {
  const productionBlock = requireSupabaseInProduction();
  if (productionBlock && !isSupabaseConfigured()) {
    return NextResponse.json({ error: productionBlock }, { status: 503 });
  }

  const body = await request.json();
  const email = String(body.email || "").trim();
  const password = String(body.password || "");

  if (isSupabaseConfigured()) {
    if (!email) {
      return NextResponse.json(
        { error: "Email is required for Supabase admin login." },
        { status: 400 },
      );
    }
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

  if (!allowLocalAdmin()) {
    return NextResponse.json(
      {
        error:
          "Local admin is disabled. Configure Supabase auth for production editing.",
      },
      { status: 403 },
    );
  }

  if (!verifyLocalPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await createLocalSession();
  return NextResponse.json({ ok: true, mode: "local" });
}
