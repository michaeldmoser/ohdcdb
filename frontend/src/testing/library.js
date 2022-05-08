// test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import configureStore from 'app/configureStore';
import { act } from 'react-dom/test-utils';

function render(
    ui,
    {
        preloadedState,
        store,
        initialEntries = ['/'],
        rootPath = '*',
        ...renderOptions
    } = {}
) {
    store =
        store ||
        configureStore({
            preloadedState,
        });
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <Router initialEntries={initialEntries}>
                    <Routes>
                        <Route path={rootPath} element={children} />
                    </Routes>
                </Router>
            </Provider>
        );
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render, userEvent, act };
