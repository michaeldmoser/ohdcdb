import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render, screen } from 'test-utils';

import App from 'App';

describe('Test routes based on authentication', () => {
    afterEach(() => localStorage.removeItem('token'));

    it('should render login screen for a non-authenticated user', () => {
        render(<App />);

        expect(screen.getAllByText(/Login/i)[0]).toBeInTheDocument();
    });

    it('should render the dashboard if the user is authenticated', () => {
        render(<App />, { preloadedState: { auth: { token: '1234' } } });

        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    });
});
