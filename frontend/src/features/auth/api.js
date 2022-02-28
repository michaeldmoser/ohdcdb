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
    }),
    overrideExisting: false,
});

export const { useLoginMutation } = userApi;
