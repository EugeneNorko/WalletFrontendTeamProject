import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://wallet-backend-team-project-36dc1co3o-ewgeniusz04s-projects.vercel.app/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().userInformation.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Transactions'],
  endpoints: builder => ({
    getTransactions: builder.query({
      query: page => {
        return `/api/transactions?page=${page + 1}`;
      },
      keepUnusedDataFor: 3,
      providesTags: ['Transactions'],
    }),

    createTransaction: builder.mutation({
      query: transaction => ({
        url: `/api/transactions`,
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: ['Transactions'],
    }),

    getCategories: builder.query({
      query: () => `/api/transactions/categories`,
      providesTags: ['Transactions'],
    }),

    getStatistics: builder.mutation({
      query: period => ({
        url: `/api/transactions/statistics`,
        method: 'POST',
        body: period,
      }),
      invalidatesTags: ['Transactions'],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useGetCategoriesQuery,
  useGetStatisticsMutation,
} = transactionsApi;
