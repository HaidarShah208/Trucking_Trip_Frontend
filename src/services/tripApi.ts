import { createApi } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { baseQuery } from "./api";
import type { TripPlanResult, TripPlannerPayload } from "../features/trip/tripTypes";

interface BackendStop {
  type: "pickup" | "fuel" | "break" | "rest" | "dropoff";
  title: string;
  sequence: number | string;
  planned_at_hour: number | string;
}

interface BackendLog {
  day_number: number | string;
  total_drive_hours: number | string;
  total_on_duty_hours: number | string;
}

interface BackendTripResponse {
  id: string;
  summary: {
    total_miles: number | string;
    drive_hours: number | string;
    total_days: number | string;
  };
  route_coordinates: [number, number][];
  stops: BackendStop[];
  logs: BackendLog[];
}

const toNumber = (value: number | string) => {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const toBackendPayload = (payload: TripPlannerPayload) => ({
  current_location: payload.currentLocation,
  pickup_location: payload.pickupLocation,
  dropoff_location: payload.dropoffLocation,
  cycle_used: payload.currentCycleUsedHours,
});

const mapBackendTrip = (trip: BackendTripResponse): TripPlanResult => ({
  id: trip.id,
  title: `Trip ${trip.id.slice(0, 8)}`,
  status: "planned",
  totalMiles: toNumber(trip.summary.total_miles),
  estimatedDriveHours: toNumber(trip.summary.drive_hours),
  estimatedDutyHours: trip.logs.reduce((acc, log) => acc + toNumber(log.total_on_duty_hours), 0),
  remainingCycleHours: Math.max(
    0,
    70 - trip.logs.reduce((acc, log) => acc + toNumber(log.total_on_duty_hours), 0),
  ),
  routePoints: trip.route_coordinates,
  stops: trip.stops.map((stop) => ({
    type: stop.type,
    label: stop.title,
    day: Math.max(1, Math.ceil(toNumber(stop.sequence) / 2)),
    mileMarker: Math.round(toNumber(stop.planned_at_hour) * 50),
  })),
  logs: trip.logs.map((log) => ({
    day: toNumber(log.day_number),
    date: `Day ${toNumber(log.day_number)}`,
    offDuty: Math.max(0, 24 - toNumber(log.total_on_duty_hours)),
    sleeperBerth: 0,
    driving: toNumber(log.total_drive_hours),
    onDuty: Math.max(0, toNumber(log.total_on_duty_hours) - toNumber(log.total_drive_hours)),
  })),
});

export const tripApi = createApi({
  reducerPath: "tripApi",
  baseQuery,
  tagTypes: ["Trip", "Logs"],
  endpoints: (builder) => ({
    submitTripPlan: builder.mutation<TripPlanResult, TripPlannerPayload>({
      queryFn: async (payload, _api, _extraOptions, fetchWithBaseQuery) => {
        const result = await fetchWithBaseQuery({
          url: "/api/trips/plan/",
          method: "POST",
          body: toBackendPayload(payload),
        });
        if (result.error) return { error: result.error as FetchBaseQueryError };
        return { data: mapBackendTrip(result.data as BackendTripResponse) };
      },
      invalidatesTags: ["Trip", "Logs"],
    }),
    getTripById: builder.query<TripPlanResult, string>({
      queryFn: async (id, _api, _extraOptions, fetchWithBaseQuery) => {
        const result = await fetchWithBaseQuery(`/api/trips/${id}/`);
        if (result.error) return { error: result.error as FetchBaseQueryError };
        return { data: mapBackendTrip(result.data as BackendTripResponse) };
      },
      providesTags: (_result, _error, id) => [{ type: "Trip", id }],
    }),
    getTripLogs: builder.query<TripPlanResult["logs"], string>({
      queryFn: async (id, _api, _extraOptions, fetchWithBaseQuery) => {
        const result = await fetchWithBaseQuery(`/api/trips/${id}/logs/`);
        if (result.error) return { error: result.error as FetchBaseQueryError };
        const logs = result.data as BackendLog[];
        return {
          data: logs.map((log) => ({
            day: toNumber(log.day_number),
            date: `Day ${toNumber(log.day_number)}`,
            offDuty: Math.max(0, 24 - toNumber(log.total_on_duty_hours)),
            sleeperBerth: 0,
            driving: toNumber(log.total_drive_hours),
            onDuty: Math.max(0, toNumber(log.total_on_duty_hours) - toNumber(log.total_drive_hours)),
          })),
        };
      },
      providesTags: (_result, _error, id) => [{ type: "Logs", id }],
    }),
  }),
});

export const {
  useSubmitTripPlanMutation,
  useGetTripByIdQuery,
  useGetTripLogsQuery,
} = tripApi;
