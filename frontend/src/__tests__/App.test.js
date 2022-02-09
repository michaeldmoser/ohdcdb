import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Login } from '../auth/Login';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../auth/Login');

describe('Should render the login screen if user is not logged in', () => {
    beforeEach(() => {
        Login.mockImplementation(() => <div>Login</div>);
    });

    it('should render login screen for a non-authenticated user', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });
});
