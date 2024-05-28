import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { updateUserId } = userSlice.actions;
export default userSlice.reducer;
