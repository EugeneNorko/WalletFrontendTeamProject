import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://wallet-backend-team-project.herokuapp.com/',
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().userInformation.token;

    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }

    //   return headers;
    // },
  }),
  tagTypes: ['Transactions'],
  endpoints: builder => ({
    getTransactions: builder.query({
      query: () => ` /api/transactions`,
      providesTags: ['Transactions'],
    }),

    createTransaction: builder.mutation({
      query: transaction => ({
        url: ` /api/transactions`,
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: ['Transactions'],
    }),

    getCategories: builder.query({
      query: () => ` /api/transactions`,
      providesTags: ['Transactions'],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useGetCategoriesQuery,
} = transactionsApi;