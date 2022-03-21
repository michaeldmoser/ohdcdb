import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken, setToken, selectRefresh } from 'features/auth/slice';
import { saveTokensToStorage } from 'features/auth/storage';

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
        const token = selectToken(getState());
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    const token = selectToken(api.getState());
    const refresh = selectRefresh(api.getState());
    if (result.error && result.error.status === 401 && token) {
        // try to get a new token
        const refreshResult = await baseQuery(
            {
                url: '/auth/token/refresh/',
                method: 'POST',
                body: { refresh },
            },
            api,
            extraOptions
        );
        if (refreshResult.data) {
            // store the new token
            const tokens = { access: refreshResult.data.access, refresh };
            api.dispatch(setToken(tokens));
            saveTokensToStorage(tokens);
            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(setToken({ access: null, refresh: null }));
        }
    }
    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ['People'],
});
