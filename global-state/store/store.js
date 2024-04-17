import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slices/favoritesSlice";
import reactotron from "../ReactotronConfig";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(reactotron.createEnhancer()),
});
