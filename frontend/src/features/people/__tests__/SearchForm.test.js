import React from 'react';
import { setupServer } from 'msw/node';
import { render, screen, findAllByRole } from 'testing/library';
import userEvent from '@testing-library/user-event';

import People from '../index';

import { peopleList, baseHandlers } from './utils';

describe('Search for people in the database', () => {
    const handlers = [...baseHandlers];

    const server = setupServer(...handlers);

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    it('should display a list of people matching the search results', async () => {
        const person = peopleList[0];
        render(<People />);

        await userEvent.type(
            screen.getByPlaceholderText(/Search people/i),
            person.last_name
        );

        const container = (
            await screen.findByRole('heading', {
                name: /list of people/i,
            })
        ).closest('article');

        expect((await findAllByRole(container, 'link')).length).toBe(1);

        const regx = new RegExp(person.email, 'i');
        expect(
            await screen.findByRole('link', {
                name: regx,
            })
        ).toBeInTheDocument();
    });
});
