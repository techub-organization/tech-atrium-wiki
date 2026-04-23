import { cn } from "@/lib/utils/cn";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  return (
    <div className={cn("code-block-dark", className)}>
      <pre className="m-0">
        <code className="text-mono">{code}</code>
      </pre>
    </div>
  );
}
