import { cn } from "../../lib/utils";

export const Badge = ({ text, className }: { text: string; className?: string }) => (
  <span
    className={cn("app-success-soft app-border inline-flex rounded-full border px-2.5 py-1 text-xs font-medium", className)}
  >
    {text}
  </span>
);
