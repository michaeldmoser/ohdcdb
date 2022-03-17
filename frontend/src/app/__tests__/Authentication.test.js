import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, waitFor, fireEvent, screen } from 'testing/library';

import App from 'App';
import { useGetUserQuery } from 'features/auth/api';
import userEvent from '@testing-library/user-event';

afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
});

describe('Test invalid authentication', () => {
    const handlers = [
        rest.post('/api/auth/token/', (request, response, context) => {
            return response(
                context.status(401),
                context.json({
                    detail: 'No active account found with the given credentials',
                }),
                context.delay(1)
            );
        }),
    ];

    const server = setupServer(...handlers);

    // Enable API mocking before tests.
    beforeAll(() => {
        jest.doMock('scenes/dashboard', () => () => <div>Dashboard</div>);
        server.listen();
    });

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    test('Login with invalid credentials', async () => {
        render(<App />);

        screen.getByLabelText('Username').value = 'username';
        screen.getByLabelText('Password').value = 'Test1234!';

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(
            await screen.findByText(
                /No active account found with the given credentials/i
            )
        ).toBeInTheDocument();
    });
});

describe('Test valid authentication', () => {
    const access = 'access';
    const refresh = 'refresh';

    const handlers = [
        rest.post('/api/auth/token/', (request, response, context) => {
            return response(
                context.json({
                    refresh,
                    access,
                }),
                context.delay(1)
            );
        }),
    ];

    const server = setupServer(...handlers);

    // Enable API mocking before tests.
    beforeAll(() => server.listen());

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    it('should show the dashboard after logging in with valid credentials', async () => {
        render(<App />);

        userEvent.type(screen.getByLabelText('Username'), 'username');
        userEvent.type(screen.getByLabelText('Password'), 'Test1234!');

        userEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(await screen.findByText(/OHDC DB/)).toBeInTheDocument();
    });

    it('should save token to sessionStorage when remember me is not checked', async () => {
        render(<App />);

        userEvent.type(screen.getByLabelText('Username'), 'username');
        userEvent.type(screen.getByLabelText('Password'), 'Test1234!');

        userEvent.click(screen.getByRole('button', { name: /Login/i }));

        await screen.findByText(/OHDC DB/);
        expect(sessionStorage.getItem('access')).toBe(access);
        expect(sessionStorage.getItem('refresh')).toBe(refresh);
    });

    it('should save token to localStorage when remember me is checked', async () => {
        render(<App />);

        userEvent.type(screen.getByLabelText('Username'), 'username');
        userEvent.type(screen.getByLabelText('Password'), 'Test1234!');
        userEvent.click(screen.getByLabelText('Remember me'));

        userEvent.click(screen.getByRole('button', { name: /Login/i }));

        await screen.findByText(/OHDC DB/);
        expect(localStorage.getItem('access')).toBe(access);
        expect(localStorage.getItem('refresh')).toBe(refresh);
    });
});

describe('Testing re-authorization', () => {
    const handlers = [
        rest.get('/api/auth/user/', (request, response, context) => {
            if (request.headers.get('Authorization') === 'Bearer 54321') {
                return response(
                    context.status(200),
                    context.json({
                        first_name: 'Test',
                        last_name: 'Tester',
                    }),
                    context.delay(1)
                );
            }

            return response(
                context.status(401),
                context.json({
                    detail: 'Given token not valid for any token type',
                    code: 'token_not_valid',
                    messages: [
                        {
                            token_class: 'AccessToken',
                            token_type: 'access',
                            message: 'Token is invalid or expired',
                        },
                    ],
                }),
                context.delay(1)
            );
        }),
        rest.post('/api/auth/token/refresh/', (request, response, context) => {
            return response(
                context.status(200),
                context.json({
                    access: '54321',
                }),
                context.delay(1)
            );
        }),
    ];

    const server = setupServer(...handlers);

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    it('should re-authorize when receiving a 401 unauthorized', async () => {
        function TestComponent() {
            const { data } = useGetUserQuery();
            if (!data) return <div>Not logged in</div>;
            return <div>Test</div>;
        }

        render(<TestComponent />, {
            preloadedState: {
                auth: {
                    access: '1234',
                    refresh: '54321',
                },
            },
        });

        await waitFor(() => screen.getByText('Test'));
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
});
