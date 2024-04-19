import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartScreen: false,
};

export const screensSlice = createSlice({
  name: "screens",
  initialState,
  reducers: {
    showCartScreen: (state) => {
      state.cartScreen = true;
    },
    hideCartScreen: (state) => {
      state.cartScreen = false;
    },
  },
});

export const { showCartScreen, hideCartScreen } = screensSlice.actions;
export default screensSlice.reducer;
