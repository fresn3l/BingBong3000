"use client";

import type { ResumeData } from "@/lib/content/types";

export function ResumePanel({
  resume,
  onChange,
}: {
  resume: ResumeData;
  onChange: (resume: ResumeData) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
          Resume
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Edits feed `/resume` and the print-to-PDF stylesheet.
        </p>
      </div>

      <label className="block">
        <span className="editor-label">Name</span>
        <input
          className="editor-input"
          value={resume.name}
          onChange={(e) => onChange({ ...resume, name: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="editor-label">Headline</span>
        <input
          className="editor-input"
          value={resume.headline}
          onChange={(e) => onChange({ ...resume, headline: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="editor-label">Location</span>
        <input
          className="editor-input"
          value={resume.location || ""}
          onChange={(e) => onChange({ ...resume, location: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="editor-label">Email</span>
        <input
          className="editor-input"
          value={resume.email || ""}
          onChange={(e) => onChange({ ...resume, email: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="editor-label">Phone</span>
        <input
          className="editor-input"
          value={resume.phone || ""}
          onChange={(e) => onChange({ ...resume, phone: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="editor-label">Summary</span>
        <textarea
          className="editor-input"
          rows={4}
          value={resume.summary || ""}
          onChange={(e) => onChange({ ...resume, summary: e.target.value })}
        />
      </label>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-wide text-zinc-400">Links</h3>
          <button
            type="button"
            className="text-sm text-emerald-400"
            onClick={() =>
              onChange({
                ...resume,
                links: [...resume.links, { label: "Link", href: "https://" }],
              })
            }
          >
            + Add
          </button>
        </div>
        {resume.links.map((link, index) => (
          <div key={`${link.label}-${index}`} className="editor-panel space-y-2 p-2">
            <input
              className="editor-input"
              placeholder="Label"
              value={link.label}
              onChange={(e) => {
                const links = [...resume.links];
                links[index] = { ...link, label: e.target.value };
                onChange({ ...resume, links });
              }}
            />
            <input
              className="editor-input"
              placeholder="URL"
              value={link.href}
              onChange={(e) => {
                const links = [...resume.links];
                links[index] = { ...link, href: e.target.value };
                onChange({ ...resume, links });
              }}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-wide text-zinc-400">
            Experience
          </h3>
          <button
            type="button"
            className="text-sm text-emerald-400"
            onClick={() =>
              onChange({
                ...resume,
                experience: [
                  {
                    id: crypto.randomUUID(),
                    company: "Company",
                    role: "Role",
                    start: "2024",
                    end: "Present",
                    bullets: ["Impact bullet"],
                  },
                  ...resume.experience,
                ],
              })
            }
          >
            + Add
          </button>
        </div>
        {resume.experience.map((job, index) => (
          <div key={job.id} className="editor-panel space-y-2 p-2">
            <input
              className="editor-input"
              placeholder="Role"
              value={job.role}
              onChange={(e) => {
                const experience = [...resume.experience];
                experience[index] = { ...job, role: e.target.value };
                onChange({ ...resume, experience });
              }}
            />
            <input
              className="editor-input"
              placeholder="Company"
              value={job.company}
              onChange={(e) => {
                const experience = [...resume.experience];
                experience[index] = { ...job, company: e.target.value };
                onChange({ ...resume, experience });
              }}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                className="editor-input"
                placeholder="Start"
                value={job.start}
                onChange={(e) => {
                  const experience = [...resume.experience];
                  experience[index] = { ...job, start: e.target.value };
                  onChange({ ...resume, experience });
                }}
              />
              <input
                className="editor-input"
                placeholder="End"
                value={job.end || ""}
                onChange={(e) => {
                  const experience = [...resume.experience];
                  experience[index] = { ...job, end: e.target.value };
                  onChange({ ...resume, experience });
                }}
              />
            </div>
            <textarea
              className="editor-input"
              rows={4}
              placeholder="Bullets (one per line)"
              value={job.bullets.join("\n")}
              onChange={(e) => {
                const experience = [...resume.experience];
                experience[index] = {
                  ...job,
                  bullets: e.target.value
                    .split("\n")
                    .map((b) => b.trim())
                    .filter(Boolean),
                };
                onChange({ ...resume, experience });
              }}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-wide text-zinc-400">
            Education
          </h3>
          <button
            type="button"
            className="text-sm text-emerald-400"
            onClick={() =>
              onChange({
                ...resume,
                education: [
                  {
                    id: crypto.randomUUID(),
                    school: "School",
                    degree: "Degree",
                    year: "2024",
                  },
                  ...resume.education,
                ],
              })
            }
          >
            + Add
          </button>
        </div>
        {resume.education.map((edu, index) => (
          <div key={edu.id} className="editor-panel space-y-2 p-2">
            <input
              className="editor-input"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const education = [...resume.education];
                education[index] = { ...edu, degree: e.target.value };
                onChange({ ...resume, education });
              }}
            />
            <input
              className="editor-input"
              placeholder="School"
              value={edu.school}
              onChange={(e) => {
                const education = [...resume.education];
                education[index] = { ...edu, school: e.target.value };
                onChange({ ...resume, education });
              }}
            />
            <input
              className="editor-input"
              placeholder="Year"
              value={edu.year || ""}
              onChange={(e) => {
                const education = [...resume.education];
                education[index] = { ...edu, year: e.target.value };
                onChange({ ...resume, education });
              }}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-wide text-zinc-400">Skills</h3>
          <button
            type="button"
            className="text-sm text-emerald-400"
            onClick={() =>
              onChange({
                ...resume,
                skills: [
                  ...resume.skills,
                  {
                    id: crypto.randomUUID(),
                    category: "Category",
                    items: ["Skill"],
                  },
                ],
              })
            }
          >
            + Add
          </button>
        </div>
        {resume.skills.map((group, index) => (
          <div key={group.id} className="editor-panel space-y-2 p-2">
            <input
              className="editor-input"
              placeholder="Category"
              value={group.category}
              onChange={(e) => {
                const skills = [...resume.skills];
                skills[index] = { ...group, category: e.target.value };
                onChange({ ...resume, skills });
              }}
            />
            <input
              className="editor-input"
              placeholder="Items (comma-separated)"
              value={group.items.join(", ")}
              onChange={(e) => {
                const skills = [...resume.skills];
                skills[index] = {
                  ...group,
                  items: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                };
                onChange({ ...resume, skills });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
