import { api } from './api';
import auth from 'features/auth/slice';

export const reducers = {
    [api.reducerPath]: api.reducer,
    auth,
};

export default reducers;
