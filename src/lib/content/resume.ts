import type { ResumeData } from "./types";

export const defaultResume: ResumeData = {
  name: "Alex Rivera",
  headline: "Solutions / Sales Engineer",
  location: "United States",
  email: "hello@example.com",
  summary:
    "Computer science background moving into solutions and sales engineering.",
  links: [],
  experience: [],
  education: [],
  skills: [],
};

export function ensureResume(resume?: ResumeData | null): ResumeData {
  if (!resume) return structuredClone(defaultResume);
  return {
    ...defaultResume,
    ...resume,
    links: resume.links ?? [],
    experience: resume.experience ?? [],
    education: resume.education ?? [],
    skills: resume.skills ?? [],
  };
}
