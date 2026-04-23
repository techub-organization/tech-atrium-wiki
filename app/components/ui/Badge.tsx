import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantMap = {
  primary: "bg-orange text-white",
  secondary: "bg-teal text-white",
  tertiary: "bg-purple text-white",
  outline: "bg-transparent border-2 border-strong text-primary",
};

const sizeMap = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export function Badge({ children, variant = "primary", size = "md", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm font-semibold uppercase",
        "tracking-wider",
        "transition-transform duration-150 ease-in-out",
        "hover:scale-105",
        variantMap[variant],
        sizeMap[size],
        className
      )}
    >
      {children}
    </span>
  );
}
