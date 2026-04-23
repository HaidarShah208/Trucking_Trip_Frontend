import type { PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

export const Card = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <section
    className={cn(
      "app-surface app-border app-glass-highlight rounded-2xl border p-5 shadow-(--shadow-card)",
      className,
    )}
  >
    {children}
  </section>
);
