import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';

import { api } from './api';

const store = configureStore({
    reducer: reducers,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        const newRootReducer = require('./reducers').default;
        store.replaceReducer(newRootReducer);
    });
}

export default store;
