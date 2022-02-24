// test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import reducer from 'app/reducers';
import { api } from 'app/api';

function render(ui, { preloadedState, store, ...renderOptions } = {}) {
    store =
        store ||
        configureStore({
            reducer,
            preloadedState,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(api.middleware),
        });
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <Router>{children}</Router>
            </Provider>
        );
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
