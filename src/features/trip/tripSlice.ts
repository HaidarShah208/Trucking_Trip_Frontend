import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TripPlanResult } from "./tripTypes";

interface TripState {
  activeTrip?: TripPlanResult;
}

const initialState: TripState = {};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setActiveTrip(state, action: PayloadAction<TripPlanResult>) {
      state.activeTrip = action.payload;
    },
  },
});

export const { setActiveTrip } = tripSlice.actions;
export default tripSlice.reducer;
