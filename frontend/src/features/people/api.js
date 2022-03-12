import { api } from 'app/api';

export const peopleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPeople: builder.query({
            query: () => ({
                url: '/people/',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetPeopleQuery } = peopleApi;
