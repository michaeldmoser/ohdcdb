import { api } from 'app/api';

export const peopleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPeople: builder.query({
            query: () => {
                return {
                    url: '/people/',
                    method: 'GET',
                };
            },
            providesTags: ['People'],
        }),
        getPerson: builder.query({
            query: (personId) => ({
                url: `/people/${personId}/`,
                method: 'GET',
            }),
            providesTags: ({ id }) => [{ type: 'People', id }],
        }),
        addPerson: builder.mutation({
            query: (details) => ({
                url: '/people/',
                method: 'POST',
                body: details,
            }),
            invalidatesTags: ({ id }) => ['People', { type: 'People', id }],
        }),
    }),
    overrideExisting: false,
});

export const { useGetPeopleQuery, useGetPersonQuery, useAddPersonMutation } =
    peopleApi;
