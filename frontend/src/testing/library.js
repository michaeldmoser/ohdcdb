// test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';

import configureStore from 'app/configureStore';

function render(ui, { preloadedState, store, ...renderOptions } = {}) {
    store =
        store ||
        configureStore({
            preloadedState,
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