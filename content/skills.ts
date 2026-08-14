export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages & Frameworks",
    items: ["Python", "Django", "FastAPI", "Flask", "jQuery", "Flutter"],
  },
  {
    // Review these — added to reflect the agentic/AI coaching work at Cefalo.
    label: "AI & Agentic Systems",
    items: ["Agentic Workflows", "LLM Integration", "Agent Architecture", "AI Coaching"],
  },
  {
    label: "Data & Messaging",
    items: ["ETL", "Prefect", "Celery", "Elastic Search", "Apache Superset"],
  },
  {
    label: "Infrastructure & Cloud",
    items: ["Docker", "AWS Lambda", "Keycloak", "CI/CD", "Microservices"],
  },
  {
    label: "Datastores",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    label: "Tooling",
    items: ["Git", "Jira"],
  },
];

/** Flat list, used for the JSON-LD `knowsAbout` field. */
export const allSkills: string[] = skillGroups.flatMap((g) => g.items);
