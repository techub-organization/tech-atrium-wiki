import { cn } from "@/lib/utils/cn";

interface SectionProps {
  children: React.ReactNode;
  spacing?: "section" | "content" | "element" | "tight";
  className?: string;
}

const spacingMap = {
  section: "mb-16",      // 4rem / 64px
  content: "mb-10",      // 2.5rem / 40px
  element: "mb-6",       // 1.5rem / 24px
  tight: "mb-4",         // 1rem / 16px
};

export function Section({ children, spacing = "section", className }: SectionProps) {
  return (
    <section className={cn(spacingMap[spacing], className)}>
      {children}
    </section>
  );
}
