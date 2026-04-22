import { Badge } from "@/app/components/ui/Badge";
import type { HeroData } from "@/lib/api/types";
import { cn } from "@/lib/utils/cn";

interface HeroSectionProps {
  hero: HeroData;
  apiSource: string;
}

export function HeroSection({ hero, apiSource }: HeroSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 min-h-400px relative">
      {/* Left Column - Main Content */}
      <div className="flex flex-col justify-center">
        <h1
          className={cn(
            "m-0 text-display font-bold text-primary",
            "text-[clamp(3rem,8vw,5rem)] leading-tight",
            "tracking-tighter",
            "animate-[slide-up-fade_0.6s_ease-out_0.1s_both]"
          )}
        >
          {hero.serviceName}
        </h1>

        <p
          className={cn(
            "mt-6 mb-0 text-body text-lg lg:text-xl",
            "text-secondary leading-loose",
            "max-w-42rem",
            "animate-[slide-up-fade_0.4s_ease-out_0.3s_both]"
          )}
        >
          {hero.summary}
        </p>
      </div>

      {/* Right Column - Metadata */}
      <div className="flex flex-col justify-center gap-6">
        <div
          className={cn(
            "flex flex-col gap-3",
            "animate-[scale-in_0.4s_ease-out_0.5s_both]"
          )}
        >
          <Badge variant="primary" size="lg">
            {hero.serviceLabel}
          </Badge>
          <Badge
            variant="outline"
            size="md"
            className="animate-[scale-in_0.4s_ease-out_0.6s_both]"
          >
            {apiSource}
          </Badge>
        </div>

        {/* Abstract Pattern - Optional Visual Element */}
        <div
          className={cn(
            "hidden lg:block w-full h-32 rounded-sm",
            "bg-linear-to-br from-orange/10 to-teal/10",
            "border-2 border-subtle",
            "animate-[scale-in_0.4s_ease-out_0.7s_both]"
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
