import { api } from 'app/api';

export const peopleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPeople: builder.query({
            query: () => ({
                url: '/people/',
                method: 'GET',
            }),
        }),
        getPerson: builder.query({
            query: (personId) => ({
                url: `/people/${personId}/`,
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetPeopleQuery, useGetPersonQuery } = peopleApi;
