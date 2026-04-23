import type { RootState } from "../../app/store";

export const selectActiveTrip = (state: RootState) => state.trip.activeTrip;
