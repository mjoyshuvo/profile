export type Project = {
  title: string;
  description: string;
  tech: string[];
  repo: string;
  live?: string;
  year: string;
  featured?: boolean;
};

/**
 * Seeded from the public repositories on github.com/mjoyshuvo.
 * Edit freely — reorder, rewrite descriptions, drop entries, or add work that
 * does not live on GitHub. Nothing here is fetched at runtime.
 */
export const projects: Project[] = [
  {
    title: "Harness IQ",
    description:
      "Scores a Claude Code setup against a capability ladder and returns a concrete, ranked list of improvements to make next.",
    tech: ["JavaScript", "Node.js", "Claude Code"],
    repo: "https://github.com/mjoyshuvo/harness-iq",
    year: "2026",
    featured: true,
  },
  {
    title: "Django with Bootstrap",
    description:
      "A production-shaped Django starter: authentication, pagination, model permissions, custom user management, and Bootstrap already wired together.",
    tech: ["Django", "Python", "Bootstrap"],
    repo: "https://github.com/mjoyshuvo/DjangoWith-Bootstrap",
    year: "2019",
    featured: true,
  },
  {
    title: "Restaurant App",
    description:
      "Dockerised Python service for restaurant ordering, built to run end to end with a single compose command.",
    tech: ["Python", "Docker"],
    repo: "https://github.com/mjoyshuvo/RestaurantApp",
    year: "2021",
    featured: true,
  },
  {
    title: "Super Hero API",
    description:
      "A CRUD REST API written in C# and .NET Core, built while picking up the .NET ecosystem.",
    tech: ["C#", ".NET Core", "REST"],
    repo: "https://github.com/mjoyshuvo/SuperHeroApi",
    year: "2023",
  },
  {
    title: "Design Patterns in Python",
    description:
      "Worked examples of the classic Gang of Four design patterns, implemented idiomatically in Python.",
    tech: ["Python", "Design Patterns"],
    repo: "https://github.com/mjoyshuvo/DesignPatternPython",
    year: "2024",
  },
  {
    title: "CI/CD with GitHub Actions",
    description:
      "A reference pipeline for testing and deploying a Python project straight from GitHub Actions.",
    tech: ["Python", "GitHub Actions", "CI/CD"],
    repo: "https://github.com/mjoyshuvo/CI-CD-Github",
    year: "2020",
  },
];
