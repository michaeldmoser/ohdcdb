import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { selectToken } from 'features/User/authSlice';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            // const token = selectToken(getState());
            // if (token) {
            //     headers.set('authorization', `Token ${token}`);
            // }
            return headers;
        },
    }),
    endpoints: () => ({}),
});
