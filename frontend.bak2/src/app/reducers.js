import { api } from './api';
import { authReducer } from 'features/User/authSlice.js';

export const reducers = {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
};

export default reducers;
