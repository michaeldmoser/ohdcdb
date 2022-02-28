import { configureStore as reduxConfigureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import { api } from './api';

const configureStore = ({ preloadedState, ...options } = {}) =>
    reduxConfigureStore({
        reducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
        ...options,
    });

export default configureStore;
