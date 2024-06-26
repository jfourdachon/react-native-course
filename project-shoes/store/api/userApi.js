import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "useApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fake.url.com/" }),
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
      query: (id) => `users/${id}.json`,
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
          userApi.util.updateQueryData("getUserById", id, (existingUser) => {
            Object.assign(existingUser, patch);
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
  useGetUserQuery,
  useLazyGetUserQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
