import { ExternalLink, FolderGit2 } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { projects } from "@/content/projects";
import { Reveal } from "./Reveal";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section id="projects" title="Projects" icon={<FolderGit2 className="h-5 w-5" />}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <li key={project.repo} className={project.featured ? "sm:col-span-1" : ""}>
            <Reveal delay={(i % 2) * 0.05} className="h-full">
              <article className="flex h-full flex-col rounded-xl border border-rule bg-paper-raised p-5 transition-colors hover:border-teal">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg font-semibold">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-teal"
                    >
                      {project.title}
                    </a>
                  </h3>
                  <span className="shrink-0 pt-1 text-xs text-ink-faint">{project.year}</span>
                </div>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {project.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded bg-teal-wash px-2 py-0.5 text-xs font-medium text-teal"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center gap-4 border-t border-rule pt-3 text-sm">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-ink-faint transition-colors hover:text-teal"
                  >
                    <GithubIcon className="h-4 w-4" />
                    Source
                  </a>
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-ink-faint transition-colors hover:text-teal"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Live
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
