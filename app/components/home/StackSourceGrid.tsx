import { StackSourceCard } from "@/app/components/home/StackSourceCard";
import type { ApiSource } from "@/lib/api/types";
import { cn } from "@/lib/utils/cn";

interface StackSourceGridProps {
  sources: ApiSource[];
}

export function StackSourceGrid({ sources }: StackSourceGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sources.map((source, index) => (
        <StackSourceCard
          key={`${source.category}-${source.name}`}
          source={source}
          animationDelay={0.6 + index * 0.08}
        />
      ))}
    </div>
  );
}
