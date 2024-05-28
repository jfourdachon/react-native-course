import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
  endpoints: (build) => ({
    getAllFavorites: build.query({
      query: (id) => `users/${id}.json`,
      transformResponse: (response, meta, arg) => {
        let result = [];

        for (const key in response) {
          if (response[key].favorites) {
            result.push(...response[key].favorites);
          }
        }
        return result;
      },
      transformErrorResponse: (err) => console.log({ err }),
    }),
    // addFavorite: build.mutation({
    //   query: (shoesId) => ({
    //     url: "favorites.json",
    //     method: "POST",
    //     body: [shoesId],
    //   }),
    //   async onQueryStarted(shoesId, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       const patchResult = dispatch(
    //         favoritesApi.util.upsertQueryData("getAllFavorites", undefined, {
    //           id: data.name,
    //           shoesIds: [shoesId],
    //         })
    //       );
    //     } catch {}
    //   },
    // }),
    updateFavorites: build.mutation({
      query: ({ id, favorites }) => ({
        url: `users/${id}.json`,
        method: "PATCH",
        body: { favorites },
      }),
      transformErrorResponse: (err) => {
        console.log(err);
      },
      transformResponse: (res) => {
        console.log(res);
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log({ arg });
        const patchResult = dispatch(
          favoritesApi.util.updateQueryData(
            "getAllFavorites",
            undefined,
            (draft) => {
              console.log({ draft, arg });
              // if (arg.favorites?.length === 0) {
              //   draft.id = null;
              // }
              draft.favorites = arg.favorites;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetAllFavoritesQuery,
  useLazyGetAllFavoritesQuery,
  useUpdateFavoritesMutation,
} = favoritesApi;
