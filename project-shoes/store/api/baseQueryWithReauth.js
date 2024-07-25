import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import * as SecureStore from "expo-secure-store";
import { setToken, setUserId } from "../slices/authSlice";
const baseQuery = fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL });

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  // 1 Exuécute la query ou la mutation
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // 2 Récupérer le token de rafraichissement
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    if (refreshToken) {
      // 3 Rafraichir les tokens
      const refreshResult = await baseQuery(
        {
          url:
            process.env.EXPO_PUBLIC_FIREBASE_TOKEN_URL +
            process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
          method: "POST",
          body: {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // 4 Stocker les nouveaux tokens
        api.dispatch(setToken(refreshResult.data.id_token));
        SecureStore.setItemAsync(
          "refreshToken",
          refreshResult.data.refresh_token
        );
        // 5 Modifier le paramètre args avec le nouveau token dans l'url
        args.url =
          args.url.split("auth=")[0] + `auth=${refreshResult.data.id_token}`;
        // 6 Ré-essayer la query ou la mutation initiale avec le nouveau token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(setToken());
        api.dispatch(setUserId());
        SecureStore.deleteItemAsync("refreshToken");
      }
    } else {
      api.dispatch(setToken());
      api.dispatch(setUserId());
    }
  }
  return result;
};
