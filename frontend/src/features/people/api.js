import { api } from 'app/api';

export const peopleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPeople: builder.query({
            query: (search) => {
                return {
                    url: '/people/' + (search && `?search=${search}`),
                    method: 'GET',
                };
            },
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'People', id })),
                          'People',
                      ]
                    : ['People'],
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
        editPerson: builder.mutation({
            query: (person) => ({
                url: `/people/${person.id}/`,
                method: 'PUT',
                body: person,
            }),
            invalidatesTags: ({ id }) => [{ type: 'People', id }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetPeopleQuery,
    useGetPersonQuery,
    useAddPersonMutation,
    useEditPersonMutation,
} = peopleApi;
