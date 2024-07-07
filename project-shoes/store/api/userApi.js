import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const userApi = createApi({
  reducerPath: "useApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `users.json`,
      transformResponse: (response, meta, { email }) => {
        let user = {};
        for (const key in response) {
          if (response[key].email === email) {
            user = {
              id: key,
              ...response[key],
            };
          }
        }
        return user;
      },
    }),
    getUserById: builder.query({
      query: ({ userId, token }) => ({
        url: `users/${userId}.json?auth=${"token"}`,
      }),
    }),
    createUser: builder.mutation({
      query: ({ user, token, id }) => ({
        url: `users/${id}.json?auth=${token}`,
        method: "PUT",
        body: user,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userId, token, ...patch }) => ({
        url: `users/${userId}.json?auth=${token}`,
        method: "PATCH",
        body: patch,
      }),
      async onQueryStarted(
        { userId, token, ...patch },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          userApi.util.updateQueryData(
            "getUserById",
            { userId, token },
            (existingUser) => {
              Object.assign(existingUser, patch);
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
  useGetUserQuery,
  useLazyGetUserQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
