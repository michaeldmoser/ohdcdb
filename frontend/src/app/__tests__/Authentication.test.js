import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from 'testing/library';
import App from 'App';

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
    const access =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ1MDE2MzI1LCJpYXQiOjE2NDUwMTYwMjUsImp0aSI6IjcwMWMwOWE4NzJkMzRjZmJhN2VhZDJmYThhNmYwMTM2IiwidXNlcl9pZCI6Mn0.voXkCBPx5LffYisQRnmRsieNKKEh9KeFEn0q4j1nBXM';
    const refresh =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0NTEwMjQyNSwiaWF0IjoxNjQ1MDE2MDI1LCJqdGkiOiIwMGQ3MThhOGQxYjI0YTRkOTI5M2MwNjQ3NjFlZDk3MSIsInVzZXJfaWQiOjJ9.Cd__Z2faZ6lmGrIeWzgXzl2jB-Sch8uREzzcbqnK35k';

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

        screen.getByLabelText('Username').value = 'username';
        screen.getByLabelText('Password').value = 'Test1234!';

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(await screen.findByText(/OHDC DB/)).toBeInTheDocument();
    });

    it('should save token to localstorage when remember me is checked', async () => {
        render(<App />);

        screen.getByLabelText('Username').value = 'username';
        screen.getByLabelText('Password').value = 'Test1234!';
        screen.getByLabelText('Remember me').click();

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await screen.findByText(/OHDC DB/);
        expect(localStorage.getItem('access')).toBe(access);
    });

    it('should save token to sessionStorage when remember me is not checked', async () => {
        render(<App />);

        screen.getByLabelText('Username').value = 'username';
        screen.getByLabelText('Password').value = 'Test1234!';

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        await screen.findByText(/OHDC DB/);
        expect(sessionStorage.getItem('access')).toBe(access);
    });
});

describe('Test is already authenticated', () => {
    afterEach(() => {
        sessionStorage.removeItem('access');
        localStorage.removeItem('access');
    });

    it('should show the Dashboard if already authenticated via sessionStorage', async () => {
        sessionStorage.setItem('access', '12345');

        render(<App />);

        expect(await screen.findByText(/OHDC DB/)).toBeInTheDocument();
    });

    it('should show the Dashboard if already authenticated via localStorage', async () => {
        localStorage.setItem('access', '12345');

        render(<App />);

        expect(await screen.findByText(/OHDC DB/)).toBeInTheDocument();
    });
});
