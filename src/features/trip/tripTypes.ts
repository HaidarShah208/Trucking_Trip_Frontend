export interface TripPlannerPayload {
  currentLocation: string;
  pickupLocation: string;
  dropoffLocation: string;
  currentCycleUsedHours: number;
}

export interface StopItem {
  type: "pickup" | "fuel" | "break" | "rest" | "dropoff";
  label: string;
  day: number;
  mileMarker: number;
}

export interface DailyLog {
  day: number;
  date: string;
  offDuty: number;
  sleeperBerth: number;
  driving: number;
  onDuty: number;
}

export interface TripPlanResult {
  id: string;
  title: string;
  status: "planned" | "in_progress" | "completed";
  totalMiles: number;
  estimatedDriveHours: number;
  estimatedDutyHours: number;
  remainingCycleHours: number;
  stops: StopItem[];
  routePoints: [number, number][];
  logs: DailyLog[];
}
