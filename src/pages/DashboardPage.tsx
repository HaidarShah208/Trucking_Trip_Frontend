import { HOS_RULES } from "../lib/constants";
import { Card } from "../components/common/Card";
import { SectionTitle } from "../components/common/SectionTitle";
import { TripPlannerForm } from "../components/form/TripPlannerForm";

export const DashboardPage = () => (
  <div className="space-y-6">
    <Card className="relative overflow-hidden">
      <div className="app-bubble-a pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full" />
      <div className="app-bubble-b pointer-events-none absolute -bottom-14 -left-10 h-32 w-32 rounded-full" />
      <div className="relative">
        <p className="app-text-muted text-xs uppercase tracking-[0.2em]">Smart Planning</p>
        <h1 className="app-text-primary mt-1 text-2xl font-semibold">Trucking Dashboard</h1>
        <p className="app-text-secondary mt-2 text-sm">
          Plan routes, monitor HOS compliance, and review ELD logs with a workspace.
        </p>
      </div>
    </Card>
    <SectionTitle
      title="Trip Planner Dashboard"
      subtitle="Create compliant route plans with fuel, break, rest, and daily ELD logs."
    />
    <div className="grid gap-4 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <TripPlannerForm />
      </div>
      <div className="space-y-4">
        <Card>
          <h3 className="app-text-primary mb-2 text-base font-semibold">How It Works</h3>
          <p className="app-text-secondary text-sm">
            Enter locations and cycle usage to generate route planning, trip stats, and multi-day FMCSA style logs.
          </p>
        </Card>
        <Card>
          <h3 className="app-text-primary mb-2 text-base font-semibold">Rule Summary</h3>
          <ul className="app-text-secondary list-disc space-y-1 pl-4 text-sm">
            {HOS_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
    <Card>
      <h3 className="app-text-primary mb-2 text-base font-semibold">Recent Trips</h3>
      <p className="app-text-muted text-sm">Recent trip history will appear here once backend history endpoint is connected.</p>
    </Card>
  </div>
);
