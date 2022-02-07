import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../login';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../login');

describe('Should render the login screen if user is not logged in', () => {
    it('should render login screen for a non-authenticated user', () => {
        Login.mockImplementation(() => <div>Login</div>);

        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });
});
