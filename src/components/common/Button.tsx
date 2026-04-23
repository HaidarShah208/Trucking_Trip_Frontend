import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Button = ({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      "app-primary rounded-xl px-4 py-2 text-sm font-medium shadow-[0_8px_20px_rgba(56,116,255,0.25)] transition inline-flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
);
