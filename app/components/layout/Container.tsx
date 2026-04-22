import { cn } from "@/lib/utils/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("max-w-screen-2xl mx-auto px-5 lg:px-8", className)}>
      {children}
    </div>
  );
}
