import { render, screen } from 'testing/library';
import App from 'App';

describe('Test routes based on authentication', () => {
    beforeEach(() => {
        // just to be safe make sure session and local store don't have a token set
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
    });

    it('should render login screen for a non-authenticated user', () => {
        render(<App />);

        expect(screen.getAllByText(/Login/i)[0]).toBeInTheDocument();
    });

    it('should render the dashboard if the user is authenticated', () => {
        render(<App />, { preloadedState: { auth: { token: '1234' } } });

        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    });
});
