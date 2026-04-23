import { Link } from "react-router-dom";

export const NotFoundPage = () => (
  <div className="app-surface app-border mx-auto max-w-lg rounded-2xl border p-8 text-center shadow-[var(--shadow-card)]">
    <h1 className="app-text-primary text-2xl font-semibold">Page Not Found</h1>
    <p className="app-text-muted mt-2">The page you requested does not exist.</p>
    <Link to="/" className="app-text-secondary mt-4 inline-block text-sm font-medium hover:underline">
      Back to dashboard
    </Link>
  </div>
);
