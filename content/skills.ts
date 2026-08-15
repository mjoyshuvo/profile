export type SkillGroup = {
  label: string;
  items: string[];
};

/**
 * Grouped tightly on purpose. Longer lists read as a keyword dump and dilute the
 * backend/data positioning — anything I'd not want to be interviewed on stays out.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: "Backend & Languages",
    items: ["Python", "Django", "FastAPI", "Flask"],
  },
  {
    // Its own group rather than a tail on the backend list: the relational,
    // document, key-value and vector stores are a distinct competency, and
    // burying them under "Backend" undersold them.
    label: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Pinecone"],
  },
  {
    label: "Data Engineering",
    items: ["ETL", "Prefect", "Celery", "Elasticsearch", "Apache Superset"],
  },
  {
    label: "Agentic & AI",
    items: [
      "Claude Code",
      "MCP",
      "Agent Architecture",
      "Agentic Workflows",
      "LLM Integration",
      "Prompt Engineering",
      "RAG",
      "LangChain",
      "LangGraph",
    ],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "AWS", "Microservices", "Keycloak", "CI/CD", "Git"],
  },
];

/** Flat list, used for the JSON-LD `knowsAbout` field. */
export const allSkills: string[] = skillGroups.flatMap((g) => g.items);
