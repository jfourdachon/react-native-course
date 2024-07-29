import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stripeApi = createApi({
  reducerPath: "stripeApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_STRIPE_URL }),
  endpoints: (builder) => ({
    fetchPulishableKey: builder.query({
      query: () => "/stripe-key",
    }),
    initPayment: builder.mutation({
      query: () => ({
        url: "/payment-sheet",
        method: "POST",
      }),
    }),
  }),
});

export const { useFetchPulishableKeyQuery, useInitPaymentMutation } = stripeApi;
