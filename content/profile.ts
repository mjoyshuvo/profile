export const SITE_URL = "https://mrityunjoy.com";

export const profile = {
  name: "Mrityunjoy Das",
  /** Kept for metadata and JSON-LD; deliberately not shown as the hero subtitle. */
  title: "Staff Software Engineer",
  headline: "I don't just ship code. I make slow systems fast and fragile ones dependable.",
  subheadline:
    "9+ years of backend and data engineering — now designing agentic workflows and coaching a team at Cefalo to build better agent architecture.",
  summary:
    "Most of the work I'm proud of started as someone else's bottleneck. A pipeline that took too long, a service that fell over under load, a search that never found anything. I dig into why, then fix the cause rather than the symptom — usually in Python, across FastAPI and Django services, Prefect workflows, and Dockerised deployments on AWS.",
  summarySecondary:
    "Lately that same instinct has gone into agentic systems: designing workflows where LLMs do real work reliably, and coaching engineers at Cefalo on how to architect them so they hold up in production rather than only in a demo.",
  location: "Dhaka, Bangladesh",
  email: "mjoyshuvo@gmail.com",
  phone: "+8801671567068",
  resumePath: "/Mrityunjoy_Das_Resume.pdf",
  photo: "/headshot.jpg",
  links: {
    linkedin: "https://www.linkedin.com/in/mrityunjoy-das/",
    github: "https://github.com/mjoyshuvo",
    githubWork: "https://github.com/shuvo-cefalo",
    // TODO(mrityunjoy): paste your real Stack Overflow profile URL here to show the link.
    stackoverflow: "",
  },
} as const;

/**
 * Headline numbers, each traceable to a specific role in content/experience.ts.
 * Shown as a stat row under the hero.
 */
export const stats = [
  { value: "75%", label: "faster data pipelines", context: "Cefalo" },
  { value: "60%", label: "better response times", context: "Brainstation-23" },
  { value: "50%", label: "shorter container builds", context: "Cefalo" },
  { value: "42%", label: "improved search accuracy", context: "InfoSapex" },
];

/** Every profile URL that belongs to this person, for JSON-LD `sameAs`. */
export const sameAs: string[] = [
  profile.links.linkedin,
  profile.links.github,
  profile.links.githubWork,
  profile.links.stackoverflow,
].filter(Boolean);
