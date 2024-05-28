import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "useApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `users.json`,
      transformResponse: (response) => {
        // console.log("get user");
        const users = [];
        for (const key in response) {
          const user = {
            id: key,
            ...response[key],
          };
          users.push(user);
        }
        return users[0];
      },
      transformErrorResponse: (error) => {
        console.log(error);
      },
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: "users.json",
        method: "POST",
        body: user,
      }),
      transformResponse: (response) => {
        return { id: response.name };
      },
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `users/${id}.json`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData("getUser", id, (draft) => {
            Object.assign(draft, patch);
          })
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
  useLazyGetUserQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
