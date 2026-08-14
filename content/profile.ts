export const SITE_URL = "https://mrityunjoy.com";

export const profile = {
  name: "Mrityunjoy Das",
  title: "Staff Software Engineer",
  tagline:
    "Backend and data engineer with 9+ years building Python services and data pipelines — currently at Cefalo, working on energy-market data for a Norwegian client.",
  summary:
    "I design and optimise backend systems and ETL pipelines: FastAPI and Django services, Prefect workflows, Dockerised deployments on AWS. Most of my work is making slow things fast and fragile things dependable — a 75% cut in pipeline processing time, 50% faster container builds, 60% better response times through caching.",
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

/** Every profile URL that belongs to this person, for JSON-LD `sameAs`. */
export const sameAs: string[] = [
  profile.links.linkedin,
  profile.links.github,
  profile.links.githubWork,
  profile.links.stackoverflow,
].filter(Boolean);
