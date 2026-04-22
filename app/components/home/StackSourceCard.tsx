import { Card } from "@/app/components/ui/Card";
import { CodeBlock } from "@/app/components/ui/CodeBlock";
import { StatusBadge } from "@/app/components/home/StatusBadge";
import type { ApiSource } from "@/lib/api/types";
import { cn } from "@/lib/utils/cn";

interface StackSourceCardProps {
  source: ApiSource;
  animationDelay?: number;
}

export function StackSourceCard({ source, animationDelay = 0 }: StackSourceCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col relative",
        "animate-[slide-up-fade_0.4s_ease-out_both]"
      )}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Vertical Category Label */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center",
          "bg-canvas border-r-2 border-subtle",
          "rounded-l-sm"
        )}
      >
        <span className="text-vertical text-xs uppercase tracking-wider font-semibold text-tertiary">
          {source.category}
        </span>
      </div>

      {/* Status Badge - Top Right */}
      <div className="absolute top-4 right-4">
        <StatusBadge status={source.status} />
      </div>

      {/* Main Content - Offset for vertical label */}
      <div className="pl-4">
        <h2 className="mt-0 mb-3 text-display text-2xl font-semibold text-primary">
          {source.name}
        </h2>

        <p className="mt-0 mb-6 text-body text-secondary leading-relaxed grow">
          {source.note}
        </p>

        {/* Dark Code Block */}
        <CodeBlock code={source.endpoint ?? "endpoint not connected yet"} />
      </div>
    </Card>
  );
}
