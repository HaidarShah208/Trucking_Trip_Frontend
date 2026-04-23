export const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-4">
    <h2 className="app-text-primary text-lg font-semibold">{title}</h2>
    {subtitle && <p className="app-text-secondary text-sm">{subtitle}</p>}
  </div>
);
