import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export function Card({ children, className, hover = true, style }: CardProps) {
  return (
    <div
      style={style}
      className={cn(
        "bg-surface border-2 border-medium",
        "rounded-sm p-8",
        "shadow-hard",
        hover && "transition-all duration-200 ease-out",
        hover && "hover:scale-[1.01] hover:-translate-y-0.5 hover:border-strong",
        className
      )}
    >
      {children}
    </div>
  );
}
