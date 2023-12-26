import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {RootState} from '../../hooks/useAppSelector';

export const nutechApi = createApi({
  reducerPath: 'nutechApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://take-home-test-api.nutech-integrasi.app',
  }),
  endpoints: builder => ({
    getProfile: builder.query<any, any>({
      query: () => '/profile',
      transformResponse: response => {
        return response;
      },
    }),
  }),
});

export const {useGetProfileQuery} = nutechApi;
