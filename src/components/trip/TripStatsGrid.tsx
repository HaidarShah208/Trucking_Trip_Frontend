import type { TripPlanResult } from "../../features/trip/tripTypes";
import { Card } from "../common/Card";

const stats = (trip: TripPlanResult) => [
  { label: "Planned Stops", value: trip.stops.length, helper: "Fuel, break, and rest checkpoints" },
  { label: "Log Days", value: trip.logs.length, helper: "Generated daily ELD sheets" },
  { label: "Trip Status", value: trip.status, helper: "Current dispatch progress" },
];

export const TripStatsGrid = ({ trip }: { trip: TripPlanResult }) => (
  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
    {stats(trip).map((item) => (
      <Card key={item.label} className="space-y-2">
        <p className="app-text-muted text-xs uppercase tracking-wide">{item.label}</p>
        <p className="app-text-primary text-2xl font-semibold capitalize">{item.value}</p>
        <p className="app-text-secondary text-sm">{item.helper}</p>
      </Card>
    ))}
  </div>
);
