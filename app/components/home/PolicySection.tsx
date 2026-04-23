import { cn } from "@/lib/utils/cn";

interface PolicySectionProps {
  highlights: string[];
}

export function PolicySection({ highlights }: PolicySectionProps) {
  return (
    <div
      className={cn(
        "editorial-callout p-8 lg:p-12",
        "animate-[slide-left-fade_0.4s_ease-out_0.9s_both]"
      )}
    >
      <h2 className="mt-0 mb-8 text-display text-3xl lg:text-4xl font-semibold text-primary">
        Frontend Override Policy
      </h2>

      <ul className="m-0 pl-0 list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((item, index) => (
          <li
            key={item}
            className="flex gap-3 items-start"
          >
            <span
              className={cn(
                "shrink-0 w-6 h-6 rounded-sm",
                "bg-orange text-white",
                "flex items-center justify-center",
                "text-xs font-bold"
              )}
            >
              {index + 1}
            </span>
            <span className="text-body text-secondary leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
