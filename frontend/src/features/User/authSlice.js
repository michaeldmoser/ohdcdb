import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AuthService = {
    login: (username, password) => {
        return axios
            .post('/api/token/', {
                username,
                password,
            })
            .then((response) => {
                return response.data;
            });
    },
};

export const login = createAsyncThunk(
    'auth/token',
    async ({ username, password }, thunkAPI) => {
        try {
            const data = await AuthService.login(username, password);
            return data;
        } catch (error) {
            console.log(error); // TODO: This needs to set a message via a toast or some sort
            return thunkAPI.rejectWithValue();
        }
    }
);

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
        [login.fulfilled]: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.access;
            state.refresh = action.payload.refresh;
        },
        [login.rejected]: (state, action) => {
            state.isAuthenticated = false;
        },
    },
});

export const selectToken = (state) => {
    return state.auth.token;
};

export const authReducer = authSlice.reducer;
