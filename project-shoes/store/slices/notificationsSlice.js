import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seenNotificationsIds: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addSeenNotification: (state, action) => {
      state.seenNotificationsIds = [
        ...state.seenNotificationsIds,
        action.payload,
      ];
    },
  },
});

export const { addSeenNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
