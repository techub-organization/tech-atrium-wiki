import type { HomePageData } from "./types";

export const mockHomePageData: HomePageData = {
  hero: {
    serviceName: "tech-atrium-wiki",
    serviceLabel: "techrium",
    summary:
      "React frontend driven developer wiki. Stack-specific APIs can replace these mock sections as contributors deliver endpoints.",
  },
  sources: [
    {
      name: "React Frontend",
      category: "framework",
      status: "mock",
      endpoint: null,
      note: "Main frontend owned by the primary developer.",
    },
    {
      name: "Python API",
      category: "language",
      status: "mock",
      endpoint: process.env.TECHRIUM_PYTHON_API ?? null,
      note: "Will override comparison or article support data when connected.",
    },
    {
      name: "Postgres Support",
      category: "database",
      status: "mock",
      endpoint: process.env.TECHRIUM_POSTGRES_API ?? null,
      note: "Schema and storage integration placeholder.",
    },
  ],
  highlights: [
    "Mock data is the default fallback until stack APIs are ready.",
    "Each contributor can wire a stack-specific endpoint without changing page structure.",
    "The frontend can swap in live responses by updating the data source layer.",
  ],
  articlePreview: {
    title: "Frontend Rendering Policy",
    summary:
      "Backend services return raw content, while the frontend owns Markdown, LaTeX, and code presentation.",
    markdown: `
## Why the frontend owns rendering

Each backend can stay focused on **raw content delivery** without bundling article layout rules.

### Math example

Inline math works as $E = mc^2$, and block math can express a comparison score:

$$
S = \\frac{2TP}{2TP + FP + FN}
$$

### Code example

\`\`\`ts
type ArticlePayload = {
  title: string;
  body: string;
  formula?: string;
};

export async function fetchArticle(id: string): Promise<ArticlePayload> {
  const res = await fetch(\`/api/articles/\${id}\`);
  return res.json();
}
\`\`\`

### Display rule

1. Backend returns source text.
2. Frontend applies Markdown parsing.
3. Frontend renders math with KaTeX.
4. Frontend highlights code blocks consistently.
`,
  },
};
