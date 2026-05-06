import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/lib/utils/cn";

interface MarkdownArticleProps {
  markdown: string;
  className?: string;
}

export function MarkdownArticle({ markdown, className }: MarkdownArticleProps) {
  return (
    <div className={cn("article-markdown", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
