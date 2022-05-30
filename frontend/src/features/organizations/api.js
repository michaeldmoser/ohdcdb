import { api } from 'app/api';

export const organizationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getOrganizations: builder.query({
            query: (search) => {
                return {
                    url: '/organizations/' + (search && `?search=${search}`),
                    method: 'GET',
                };
            },
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Organizations',
                              id,
                          })),
                          'Organizations',
                      ]
                    : ['Organizations'],
        }),
        getOrganization: builder.query({
            query: (recordId) => ({
                url: `/organizations/${recordId}/`,
                method: 'GET',
            }),
            providesTags: ({ id }, errors, args) => [
                { type: 'Organizations', id },
            ],
        }),
        addOrganization: builder.mutation({
            query: (details) => ({
                url: '/organizations/',
                method: 'POST',
                body: details,
            }),
            invalidatesTags: ({ id }) => [
                'Organizations',
                { type: 'Organizations', id },
            ],
        }),
        editOrganization: builder.mutation({
            query: (property) => ({
                url: `/organizations/${property.id}/`,
                method: 'PUT',
                body: property,
            }),
            invalidatesTags: ({ id }) => [{ type: 'Organizations', id }],
        }),
    }),
    overrideExisting: false,
});

api.enhanceEndpoints({ addTagTypes: ['Organizations'] });

export const {
    useGetOrganizationsQuery,
    useGetOrganizationQuery,
    useAddOrganizationMutation,
    useEditOrganizationMutation,
} = organizationsApi;
