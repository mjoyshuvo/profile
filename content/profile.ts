export const SITE_URL = "https://mrityunjoy.com";

export const profile = {
  name: "Mrityunjoy Das",
  /** Kept for metadata and JSON-LD; deliberately not shown as the hero subtitle. */
  title: "Staff Software Engineer",
  headline: "I don't just ship code. I make slow systems fast and fragile ones dependable.",
  /** One sentence, carrying the proof. Anything longer stops being read. */
  subheadline:
    "9+ years of Python backend and data engineering — pipelines and services for Norwegian clients like Veyt and Ferdia, now designing agentic systems that hold up in production, not just in demos.",
  location: "Dhaka, Bangladesh",
  email: "mjoyshuvo@gmail.com",
  resumePath: "/Mrityunjoy_Das_Resume.pdf",
  photo: "/mrityunjoy-das-portrait.jpg",
  links: {
    linkedin: "https://www.linkedin.com/in/mrityunjoy-das/",
    github: "https://github.com/mjoyshuvo",
    githubWork: "https://github.com/shuvo-cefalo",
  },
} as const;

/** Every profile URL that belongs to this person, for JSON-LD `sameAs`. */
export const sameAs: string[] = [
  profile.links.linkedin,
  profile.links.github,
  profile.links.githubWork,
].filter(Boolean);
