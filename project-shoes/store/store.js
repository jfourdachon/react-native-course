import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./slices/favoritesSlice";
import notificationReducer from "./slices/notificationsSlice";
import cartReducer from "./slices/cartSlice";
import { favoritesApi } from "./api/favoritesApi";
import { notificationsApi } from "./api/notificationsApi";
import { userApi } from "./api/userApi";
import { rtkQueryErrorMiddleware } from "./middlewares/errorMiddleware";
import errorReducer from "./slices/errorSlice";
import authReducer from "./slices/authSlice";
import { authApi } from "./api/authApi";
import { stripeApi } from "./api/stripe";

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    notifications: notificationReducer,
    cart: cartReducer,
    error: errorReducer,
    auth: authReducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [stripeApi.reducerPath]: stripeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(favoritesApi.middleware)
      .concat(notificationsApi.middleware)
      .concat(userApi.middleware)
      .concat(rtkQueryErrorMiddleware)
      .concat(authApi.middleware)
      .concat(stripeApi.middleware),
  enhancers: (getDEfaultEnhancer) =>
    __DEV__
      ? getDEfaultEnhancer().concat(
          require("../ReactotronConfig").default.createEnhancer()
        )
      : getDEfaultEnhancer(),
});
