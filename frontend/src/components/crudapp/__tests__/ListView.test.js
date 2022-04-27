import React from 'react';
import { render, screen, findAllByRole } from 'testing/library';

import { SUT, database, setupServer } from './utils';

describe('Test displaying the list of records', () => {
    const server = setupServer();

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => server.close());

    it('should display a list of a records', async () => {
        render(<SUT />, {
            initialEntries: ['/'],
        });

        const articleHeading = await screen.findByRole('heading', {
            name: /list of records/i,
        });
        const article = articleHeading.closest('article');
        const records = await findAllByRole(article, 'listitem');

        expect(records.length).toEqual(database.length);
    });
});
