import type { TripPlanResult } from "../features/trip/tripTypes";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type TripResponse = ApiResponse<TripPlanResult>;
