import type { Metadata } from "next";
import Link from "next/link";
import { PrintResumeButton } from "@/components/resume/PrintResumeButton";
import { ResumeDocument } from "@/components/resume/ResumeDocument";
import { getResume, getSettings } from "@/lib/content/repository";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const resume = await getResume();
  const title = `Resume · ${resume.name}`;
  const description = resume.summary || `${resume.name} — ${resume.headline}`;
  return {
    title,
    description,
    alternates: { canonical: "/resume" },
    openGraph: {
      title,
      description,
      url: absoluteUrl("/resume"),
      type: "profile",
    },
  };
}

export default async function ResumePage() {
  const [resume, settings] = await Promise.all([getResume(), getSettings()]);

  return (
    <div className="resume-page">
      <div className="site-container resume-toolbar no-print">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-[var(--color-accent)]">
            Resume
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--color-fg)]">
            Printable CV
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[var(--color-muted)]">
            Use <strong>Print / Save PDF</strong>, then choose “Save as PDF” in
            your browser print dialog. Margins and page breaks are tuned for
            US Letter.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrintResumeButton />
          <Link href="/contact" className="btn-secondary text-sm">
            Hire me
          </Link>
          {settings.social.email ? (
            <a
              href={`mailto:${settings.social.email}`}
              className="btn-secondary text-sm"
            >
              Email
            </a>
          ) : null}
        </div>
      </div>

      <div className="site-container resume-stage">
        <ResumeDocument resume={resume} />
      </div>
    </div>
  );
}
