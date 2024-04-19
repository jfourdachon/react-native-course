import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import favoriteReducer from "./slices/favoritesSlice";
import notificationReducer from "./slices/notificationsSlice";
import cartReducer from "./slices/cartSlice";
import screensReducer from "./slices/screensSlice";

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    notifications: notificationReducer,
    cart: cartReducer,
    screens: screensReducer,
  },

  enhancers: (getDEfaultEnhancer) =>
    getDEfaultEnhancer().concat(reactotron.createEnhancer()),
});
