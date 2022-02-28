import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'auth',
    initialState: { access: null, refresh: null },
    reducers: {
        setToken: (state, { payload: { access, refresh } }) => {
            state.access = access;
            state.refresh = refresh;
        },
    },
});

export const { setToken } = slice.actions;

export default slice.reducer;

export const selectToken = (state) => state.auth.access;
