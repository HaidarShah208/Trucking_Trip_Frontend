import type { TripPlanResult } from "../../features/trip/tripTypes";
import { formatHours, formatMiles } from "../../lib/formatters";
import { Card } from "../common/Card";

export const TripSummaryCard = ({ trip }: { trip: TripPlanResult }) => (
  <Card>
    <h3 className="app-text-primary mb-3 text-base font-semibold">Trip Summary</h3>
    <div className="app-text-secondary space-y-2 text-sm">
      <p>Total Miles: {formatMiles(trip.totalMiles)}</p>
      <p>Drive Time: {formatHours(trip.estimatedDriveHours)}</p>
      <p>Duty Time: {formatHours(trip.estimatedDutyHours)}</p>
      <p>Cycle Remaining: {formatHours(trip.remainingCycleHours)}</p>
    </div>
  </Card>
);
