import React from 'react';
import { render, screen, getByText, getAllByText } from 'testing/library';

import { SUT, database, setupServer } from './utils';

describe('Test displaying a record', () => {
    const server = setupServer();

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => server.close());

    it('should display the details of a record', async () => {
        const record = database[1];

        render(<SUT />, {
            initialEntries: [`/${record.id}`],
        });

        const title = await screen.findByText('Title');
        const container = title.closest('article');

        expect(title).toBeInTheDocument();
        expect(getByText(container, 'Description')).toBeInTheDocument();

        expect(getAllByText(container, record.title)[0]).toBeInTheDocument();
        expect(getByText(container, record.description)).toBeInTheDocument();
    });
});
