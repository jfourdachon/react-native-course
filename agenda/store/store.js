import { configureStore } from "@reduxjs/toolkit";
import agendaReducer from "./slices/agendaSlice";
import { agendaApi } from "./api/agendaApi";
import { authApi } from "./api/authApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    agenda: agendaReducer,
    [agendaApi.reducerPath]: agendaApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(agendaApi.middleware).concat(authApi.middleware),
});
