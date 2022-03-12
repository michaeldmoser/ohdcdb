import { createSlice } from '@reduxjs/toolkit';

const initialState = { access: null, refresh: null };

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, { payload: { access, refresh } }) => {
            state.access = access;
            state.refresh = refresh;
        },

        reset: () => initialState,
    },
});

export const { setToken, reset } = slice.actions;

export default slice.reducer;

export const selectToken = (state) => state.auth.access;
export const selectRefresh = (state) => state.auth.refresh;
