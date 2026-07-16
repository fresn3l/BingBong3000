import type { ResumeData } from "@/lib/content/types";

export function ResumeDocument({ resume }: { resume: ResumeData }) {
  const contactBits = [
    resume.location,
    resume.email,
    resume.phone,
  ].filter(Boolean);

  return (
    <article className="resume-sheet">
      <header className="resume-header">
        <h1 className="resume-name">{resume.name}</h1>
        <p className="resume-headline">{resume.headline}</p>
        {contactBits.length > 0 ? (
          <p className="resume-contact">{contactBits.join(" · ")}</p>
        ) : null}
        {resume.links.length > 0 ? (
          <p className="resume-links">
            {resume.links.map((link, i) => (
              <span key={`${link.href}-${link.label}`}>
                {i > 0 ? " · " : null}
                <a href={link.href}>{link.label}</a>
              </span>
            ))}
          </p>
        ) : null}
      </header>

      {resume.summary ? (
        <section className="resume-section">
          <h2>Summary</h2>
          <p className="resume-summary">{resume.summary}</p>
        </section>
      ) : null}

      {resume.experience.length > 0 ? (
        <section className="resume-section">
          <h2>Experience</h2>
          <ul className="resume-entries">
            {resume.experience.map((job) => (
              <li key={job.id} className="resume-entry">
                <div className="resume-entry-top">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="resume-org">
                      {job.company}
                      {job.location ? ` · ${job.location}` : ""}
                    </p>
                  </div>
                  <p className="resume-dates">
                    {job.start}
                    {job.end ? ` – ${job.end}` : ""}
                  </p>
                </div>
                {job.bullets.length > 0 ? (
                  <ul className="resume-bullets">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {resume.education.length > 0 ? (
        <section className="resume-section">
          <h2>Education</h2>
          <ul className="resume-entries">
            {resume.education.map((edu) => (
              <li key={edu.id} className="resume-entry">
                <div className="resume-entry-top">
                  <div>
                    <h3>{edu.degree}</h3>
                    <p className="resume-org">{edu.school}</p>
                    {edu.details ? (
                      <p className="resume-details">{edu.details}</p>
                    ) : null}
                  </div>
                  {edu.year ? <p className="resume-dates">{edu.year}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {resume.skills.length > 0 ? (
        <section className="resume-section">
          <h2>Skills</h2>
          <ul className="resume-skills">
            {resume.skills.map((group) => (
              <li key={group.id}>
                <span className="resume-skill-cat">{group.category}:</span>{" "}
                {group.items.join(" · ")}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
