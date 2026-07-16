import { NextResponse } from "next/server";
import { addLead } from "@/lib/content/repository";

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const company = String(body.company || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const lead = await addLead({
    name,
    email,
    company: company || undefined,
    message,
  });

  // Optional Resend delivery when configured
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [process.env.CONTACT_TO_EMAIL],
          subject: `Hire inquiry from ${name}`,
          text: `From: ${name} <${email}>\nCompany: ${company || "—"}\n\n${message}`,
        }),
      });
    } catch {
      // Lead is already stored; email is best-effort.
    }
  }

  return NextResponse.json({ ok: true, id: lead.id });
}
