import { configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';

const store = configureStore({
    reducer: reducers,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        const newRootReducer = require('./reducers').default;
        store.replaceReducer(newRootReducer);
    });
}

// store.subscribe(() => {
//     saveTokenToStorage(store.getState().token);
//     saveRefreshTokenToStorage(store.getState().token);
// });

export default store;
