import { render, screen } from 'testing/library';
import App from 'App';

describe('Test routes based on authentication', () => {
    function clearStorage() {
        sessionStorage.removeItem('token');
        localStorage.removeItem('token');
    }

    beforeEach(() => clearStorage());
    afterEach(() => clearStorage());

    it('should render login screen for a non-authenticated user', async () => {
        render(<App />);

        expect((await screen.findAllByText(/Login/i))[0]).toBeInTheDocument();
    });

    it('should render the dashboard if the user is authenticated', async () => {
        render(<App />, { preloadedState: { auth: { access: '1234' } } });

        expect(await screen.findByText(/OHDC DB/));
    });
});
