import { Card } from "@/app/components/ui/Card";
import { MarkdownArticle } from "@/app/components/content/MarkdownArticle";

interface ArticlePreviewSectionProps {
  title: string;
  summary: string;
  markdown: string;
}

export function ArticlePreviewSection({
  title,
  summary,
  markdown,
}: ArticlePreviewSectionProps) {
  return (
    <Card className="border-accent-l bg-surface/95 p-0 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div className="bg-linear-to-b from-canvas to-base p-8 lg:p-10 border-b-2 lg:border-b-0 lg:border-r-2 border-subtle">
          <p className="m-0 text-xs uppercase tracking-[0.18em] text-tertiary font-semibold">
            Article Rendering
          </p>
          <h2 className="mt-4 mb-4 text-display text-3xl lg:text-4xl leading-tight text-primary">
            {title}
          </h2>
          <p className="m-0 text-body text-secondary leading-loose">
            {summary}
          </p>
        </div>

        <div className="p-8 lg:p-10">
          <MarkdownArticle markdown={markdown} />
        </div>
      </div>
    </Card>
  );
}
