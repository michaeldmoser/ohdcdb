import { render } from 'testing/library';
import App from 'App';

test('renders learn react link', () => {
    const { getByText } = render(<App />);

    expect(getByText(/learn/i)).toBeInTheDocument();
});
