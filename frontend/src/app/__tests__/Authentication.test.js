import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from 'testing/library';
import App from 'App';

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
    rest.post('/api/token/', (request, response, context) => {
        return response(
            context.json({
                refresh:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0NTEwMjQyNSwiaWF0IjoxNjQ1MDE2MDI1LCJqdGkiOiIwMGQ3MThhOGQxYjI0YTRkOTI5M2MwNjQ3NjFlZDk3MSIsInVzZXJfaWQiOjJ9.Cd__Z2faZ6lmGrIeWzgXzl2jB-Sch8uREzzcbqnK35k',
                access: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ1MDE2MzI1LCJpYXQiOjE2NDUwMTYwMjUsImp0aSI6IjcwMWMwOWE4NzJkMzRjZmJhN2VhZDJmYThhNmYwMTM2IiwidXNlcl9pZCI6Mn0.voXkCBPx5LffYisQRnmRsieNKKEh9KeFEn0q4j1nBXM',
            }),
            context.delay(150)
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

test('Login a user using valid credentials', async () => {
    render(<App />);

    screen.getByLabelText('Username').value = 'username';
    screen.getByLabelText('Password').value = 'Test1234!';

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(await screen.findByText(/Dashboard/i)).toBeInTheDocument();
});
