import React from 'react';
import { render, screen, findAllByRole } from 'testing/library';
import userEvent from '@testing-library/user-event';

import { SUT, setupServer } from './utils';

describe('Test filtering the list of records', () => {
    const server = setupServer();

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => server.close());

    it('should display a filtered list of a records', async () => {
        render(<SUT />, {
            initialEntries: ['/'],
        });

        userEvent.type(screen.getByPlaceholderText(/Search.../i), 'LLC');

        const articleHeading = await screen.findByRole('heading', {
            name: /list of records/i,
        });
        const article = articleHeading.closest('article');
        const records = await findAllByRole(article, 'listitem');

        expect(records.length).toEqual(1);
    });
});
