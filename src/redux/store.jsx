// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import serviceReducer from "./slice/ServiceSlice";
import teamReducer from "./slice/TeamSlice";
import bookingReducer from "./slice/BookingSlice"; 
import dashboardReducer from "./slice/DashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    team: teamReducer,
    booking: bookingReducer, 
    dashboard: dashboardReducer,
  },
});