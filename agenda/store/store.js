import { configureStore } from "@reduxjs/toolkit";
import agendaReducer from "./slices/agendaSlice";
import { agendaApi } from "./api/agendaApi";

export const store = configureStore({
  reducer: {
    agenda: agendaReducer,
    [agendaApi.reducerPath]: agendaApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(agendaApi.middleware),
});
