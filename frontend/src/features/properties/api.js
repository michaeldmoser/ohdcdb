import { api } from 'app/api';

export const propertiesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProperties: builder.query({
            query: (search) => {
                return {
                    url: '/properties/' + (search && `?search=${search}`),
                    method: 'GET',
                };
            },
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Properties',
                              id,
                          })),
                          'Properties',
                      ]
                    : ['Properties'],
        }),
        getProperty: builder.query({
            query: (recordId) => ({
                url: `/properties/${recordId}/`,
                method: 'GET',
            }),
            providesTags: ({ id }, errors, args) => [
                { type: 'Properties', id },
            ],
        }),
        addProperty: builder.mutation({
            query: (details) => ({
                url: '/properties/',
                method: 'POST',
                body: details,
            }),
            invalidatesTags: ({ id }) => [
                'Properties',
                { type: 'Properties', id },
            ],
        }),
        editProperty: builder.mutation({
            query: (property) => ({
                url: `/properties/${property.id}/`,
                method: 'PUT',
                body: property,
            }),
            invalidatesTags: ({ id }) => [{ type: 'Properties', id }],
        }),
    }),
    overrideExisting: false,
});

api.enhanceEndpoints({ addTagTypes: ['Properties'] });

export const {
    useGetPropertiesQuery,
    useGetPropertyQuery,
    useAddPropertyMutation,
    useEditPropertyMutation,
} = propertiesApi;
