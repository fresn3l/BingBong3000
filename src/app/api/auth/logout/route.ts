import { NextResponse } from "next/server";
import { clearLocalSession } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/content/repository";

export async function POST() {
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const sb = await createClient();
      await sb.auth.signOut();
    } catch {
      // ignore
    }
  }
  await clearLocalSession();
  return NextResponse.json({ ok: true });
}
