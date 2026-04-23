import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "../features/trip/tripSlice";
import { tripApi } from "../services/tripApi";

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    [tripApi.reducerPath]: tripApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tripApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
