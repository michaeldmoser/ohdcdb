import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'auth',
    initialState: { token: null, refresh: null },
    reducers: {
        setToken: (state, { payload: { access, refresh } }) => {
            state.token = access;
            state.refresh = refresh;
        },
    },
});

export const { setToken } = slice.actions;

export default slice.reducer;

export const selectToken = (state) => state.auth.token;
