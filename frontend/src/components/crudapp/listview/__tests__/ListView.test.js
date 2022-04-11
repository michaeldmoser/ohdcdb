import { render } from 'testing/library';
import { ListView, ListItem } from '../index';

describe('Render the list view', () => {
    it('should render with defaults', () => {
        const query = {
            data: [
                {
                    id: 1,
                    title: 'Title 1',
                    additionalInfo: 'Additional info 1',
                },
                {
                    id: 2,
                    title: 'Title 2',
                    additionalInfo: 'Additional info 2',
                },
                {
                    id: 3,
                    title: 'Title 3',
                    additionalInfo: 'Additional info 3',
                },
            ],
            isLoading: false,
        };

        const listview = render(
            <ListView listName='List of properties' query={query}>
                {({ title, additionalInfo }) => (
                    <>
                        {title} {additionalInfo}
                    </>
                )}
            </ListView>
        );

        expect(listview).toMatchSnapshot();
    });

    it('should no matching results when there are no records', () => {
        const query = {
            data: null,
            isLoading: false,
        };

        const listview = render(
            <ListView listName='List of properties' query={query}>
                {() => {}}
            </ListView>
        );

        expect(listview).toMatchSnapshot();
    });

    it('should show a loading message', () => {
        const query = {
            data: null,
            isLoading: true,
        };

        const listview = render(
            <ListView listName='List of properties' query={query}>
                {() => {}}
            </ListView>
        );

        expect(listview).toMatchSnapshot();
    });
});
