import { Badge } from "@/app/components/ui/Badge";
import type { StackApiStatus } from "@/lib/api/types";

interface StatusBadgeProps {
  status: StackApiStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isLive = status === "live";

  return (
    <Badge variant={isLive ? "secondary" : "tertiary"} size="sm">
      {isLive ? "Live API" : "Mock Data"}
    </Badge>
  );
}
