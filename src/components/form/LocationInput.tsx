import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const LocationInput = ({ label, error, ...props }: Props) => (
  <label className="block space-y-1">
    <span className="app-text-secondary text-sm font-medium">{label}</span>
    <input
      {...props}
      className="app-surface app-border app-text-primary w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[var(--color-primary)]"
    />
    {error && <p className="app-danger-soft rounded-md px-2 py-1 text-xs">{error}</p>}
  </label>
);
