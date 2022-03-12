import { api } from 'app/api';

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/token/',
                method: 'POST',
                body: credentials,
            }),
        }),
        getUser: builder.query({
            query: () => ({
                url: '/auth/user/',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useGetUserQuery } = userApi;
