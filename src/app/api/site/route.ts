import { NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/content/repository";
import { isAdminAuthenticated } from "@/lib/auth";
import type { SiteData } from "@/lib/content/types";

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as SiteData;
  if (!body?.settings || !Array.isArray(body.pages)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const saved = await saveSiteData({
    ...body,
    resume: body.resume,
    projects: body.projects ?? [],
    posts: body.posts ?? [],
    leads: body.leads ?? [],
  }).catch((err: unknown) => {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Save failed" },
      { status: 500 },
    );
  });

  if (saved instanceof NextResponse) return saved;
  return NextResponse.json(saved);
}
