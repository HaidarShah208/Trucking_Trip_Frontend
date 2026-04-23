import type { TripPlanResult } from "../../features/trip/tripTypes";
import { Card } from "../common/Card";

export const StopsTimeline = ({ trip }: { trip: TripPlanResult }) => (
  <Card>
    <h3 className="app-text-primary mb-3 text-base font-semibold">Planned Stops</h3>
    <ul className="space-y-2">
      {trip.stops.map((stop, idx) => (
        <li key={`${stop.type}-${idx}`} className="app-surface-soft app-text-secondary rounded-xl p-3 text-sm">
          <span className="font-medium capitalize">{stop.type}</span> - {stop.label} (Day {stop.day}, Mile {stop.mileMarker})
        </li>
      ))}
    </ul>
  </Card>
);
