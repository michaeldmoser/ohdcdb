import { render } from 'testing/library';
import PageHeader from '../PageHeader';

describe('Rendering the page header', () => {
    it('should render with defaults', () => {
        const pageheader = render(<PageHeader />);

        expect(pageheader).toMatchSnapshot();
    });

    it('should render a class name when passed in', () => {
        const pageheader = render(<PageHeader className='pageheader' />);

        expect(pageheader).toMatchSnapshot();
    });

    it('should render with the provided title from the useHeader hook', () => {
        const pageheader = render(<PageHeader title='Test Title' />);

        expect(pageheader).toMatchSnapshot();
    });
});
