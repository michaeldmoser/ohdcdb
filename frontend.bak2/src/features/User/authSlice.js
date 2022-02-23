import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

let token;
const initialState = {
    loading: true,
    error: null,
    token: (token =
        localStorage.getItem('token') ||
        sessionStorage.getItem('token') ||
        null),
    refresh:
        localStorage.getItem('refresh') ||
        sessionStorage.getItem('refresh') ||
        null,
    isAuthenticated: !!token,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        // [api.endpoints.login.matchFulfilled]: (state, action) => {
        //     state.isAuthenticated = true;
        //     state.token = action.payload.access;
        //     state.refresh = action.payload.refresh;
        // },
        // [login.rejected]: (state, action) => {
        //     state.isAuthenticated = false;
        // },
    },
});

export const selectToken = (state) => {
    return state.auth.token;
};

export const authReducer = authSlice.reducer;
