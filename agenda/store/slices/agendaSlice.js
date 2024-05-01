import { crateSlice, createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [
    {
      id: "dummyId",
      title: "My title",
      location: "Au bureau",
      phoneNumber: "0745760245",
      description: "Réunion React Native",
      startDate: "2026-11-24T10:30:00",
      endDate: "2026-11-24T11:30:00",
      isOnline: false,
    },
    {
      id: "dummyId-2",
      title: "My title - 2",
      location: "https://dyma.com/react-native",
      phoneNumber: "0745760245",
      description:
        "Réunion React Native concernant les formulaires car une app sans formulaire ça n'existe pas",
      startDate: "2026-12-24T10:30:00",
      endDate: "2026-12-24T11:30:00",
      isOnline: true,
    },
  ],
};

export const agendaSlice = createSlice({
  name: "agenda",
  initialState,
  reducers: {},
});

export default agendaSlice.reducer;
