import React from 'react';
import { render, screen, getByText } from 'testing/library';

import People from '../index';

import {
    openAddPersonForm,
    fillOutFormTheForm,
    submitTheForm,
    setupPeopleBackend,
} from './utils';

describe('Adding a person to the database', () => {
    const person = {
        first_name: 'Anew',
        last_name: 'User',
        mobile: '406-555-9876',
        email: 'anew.user@example.com',
    };

    setupPeopleBackend();

    it('should display details of newly created person', async () => {
        render(<People />, {
            rootPath: '/people/*',
            initialEntries: ['/people'],
        });

        openAddPersonForm();
        await fillOutFormTheForm(person);
        submitTheForm();
        const regx = new RegExp(
            `${person.first_name} ${person.last_name}`,
            'i'
        );
        const container = (
            await screen.findByRole('heading', {
                name: regx,
                level: 4,
            })
        ).closest('article');

        expect(
            getByText(container, new RegExp(person.email, 'i'))
        ).toBeInTheDocument();
        expect(
            getByText(container, new RegExp(person.mobile, 'i'))
        ).toBeInTheDocument();
    });

    it('should list the new person in the list', async () => {
        render(<People />, {
            rootPath: '/people/*',
            initialEntries: ['/people'],
        });

        openAddPersonForm();
        await fillOutFormTheForm(person);
        submitTheForm();

        const regx = new RegExp(person.first_name, 'i');
        await screen.findByRole('heading', {
            name: regx,
            level: 4,
        });

        expect(
            await screen.findByRole('link', {
                name: regx,
            })
        ).toBeInTheDocument();
    });
});
