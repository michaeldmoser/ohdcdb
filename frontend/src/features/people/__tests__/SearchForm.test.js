import React from 'react';
import { setupServer } from 'msw/node';
import { render, screen, findAllByRole } from 'testing/library';
import userEvent from '@testing-library/user-event';

import People from '../index';

import { peopleList, setupPeopleBackend } from './utils';

describe('Search for people in the database', () => {
    setupPeopleBackend();

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
