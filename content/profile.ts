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
    "Backend and Data Engineer with 10 years of experience building scalable systems and robust data pipelines, now building the MCP tooling and agentic workflows on top of them. AI Coach and AI Task Force member at Cefalo, mentoring engineers on agentic development.",
  /**
   * The supporting line is deliberately less literal than a search engine needs,
   * so <meta> and JSON-LD get their own keyword-carrying sentence.
   */
  metaDescription:
    "Staff Software Engineer with 10 years in backend, data, and AI engineering — 200+ ETL pipelines, FastAPI and Django services, MCP servers and agentic workflows, for Norwegian clients including Veyt and Ferdia.",
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
  /** Public booking page: a call can be set without an email round-trip. */
  bookingUrl: "https://cal.com/mrityunjoy-das-d6xwna/30min",
  links: {
    linkedin: "https://www.linkedin.com/in/mrityunjoy-das/",
    github: "https://github.com/mjoyshuvo",
    githubWork: "https://github.com/shuvo-cefalo",
  },
} as const;

/** The three disciplines, stacked on ruled lines under the portrait. */
export const disciplines = ["Backend", "Data engineering", "AI"];

/** Every profile URL that belongs to this person, for JSON-LD `sameAs`. */
export const sameAs: string[] = [
  profile.links.linkedin,
  profile.links.github,
  profile.links.githubWork,
].filter(Boolean);
