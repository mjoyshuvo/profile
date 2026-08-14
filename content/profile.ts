export const SITE_URL = "https://mrityunjoy.com";

export const profile = {
  name: "Mrityunjoy Das",
  /** Kept for metadata and JSON-LD; the hero leads with the triad instead. */
  title: "Staff Software Engineer",
  /** Shown as a small status row above the statement. */
  status: "At Cefalo — open to select work",
  /** The statement. Last line renders in the accent colour. */
  triad: ["Engineer.", "Mentor.", "Builder."],
  /** The supporting paragraph under the statement. */
  supportingLine:
    "Backend and Data Engineer with 10 years of experience building scalable systems and robust data pipelines. Passionate about solving complex technical challenges while actively mentoring the next generation of engineering talent.",
  /**
   * The supporting line is deliberately less literal than a search engine needs,
   * so <meta> and JSON-LD get their own keyword-carrying sentence.
   */
  metaDescription:
    "Staff Software Engineer with 10 years in backend, data, and AI engineering — ETL pipelines, FastAPI and Django services, and agentic systems, for Norwegian clients including Veyt and Ferdia.",
  location: "Dhaka, Bangladesh",
  email: "mjoyshuvo@gmail.com",
  resumePath: "/Mrityunjoy_Das_Resume.pdf",
  /** Photograph — used for OpenGraph and JSON-LD, where a real face is wanted. */
  photo: "/mrityunjoy-das-portrait.jpg",
  /**
   * Pencil-sketch treatment of the same portrait, drawn on transparency so it
   * sits on the paper with no frame. Near-black ink; dark mode inverts it in CSS.
   */
  sketch: "/mrityunjoy-das-sketch.png",
  links: {
    linkedin: "https://www.linkedin.com/in/mrityunjoy-das/",
    github: "https://github.com/mjoyshuvo",
    githubWork: "https://github.com/shuvo-cefalo",
  },
} as const;

/**
 * The three disciplines, in the reference's three-column shape. Captions carry
 * real tools rather than invented per-discipline year counts — the ten years
 * is stated once, in the supporting line.
 */
export const disciplines = [
  { name: "Backend", detail: "FastAPI · Django" },
  { name: "Data", detail: "ETL · Prefect" },
  { name: "AI", detail: "Agents · MCP" },
];

/** Every profile URL that belongs to this person, for JSON-LD `sameAs`. */
export const sameAs: string[] = [
  profile.links.linkedin,
  profile.links.github,
  profile.links.githubWork,
].filter(Boolean);
