import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import favoriteReducer from "./slices/favoritesSlice";
import notificationReducer from "./slices/notificationsSlice";
import cartReducer from "./slices/cartSlice";
import { favoritesApi } from "./api/favoritesApi";

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    notifications: notificationReducer,
    cart: cartReducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesApi.middleware),
  enhancers: (getDEfaultEnhancer) =>
    getDEfaultEnhancer().concat(reactotron.createEnhancer()),
});
