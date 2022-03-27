import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, getByText } from 'testing/library';

import AddPerson from '../AddPerson';
import People from '../index';

import { openAddPersonForm, fillOutFormTheForm, submitTheForm } from './utils';

it('should add a person to the database', () => {
    render(<AddPerson />);
});

describe('Adding a person to the database', () => {
    const person = {
        id: 1000,
        first_name: 'Anew',
        last_name: 'User',
        mobile: '406-555-9876',
        email: 'anew.user@example.com',
    };

    let peopleList = [];

    const handlers = [
        rest.get('/api/people/', (req, res, ctx) => {
            return res(ctx.json(peopleList));
        }),
        rest.post('/api/people/', (request, response, context) => {
            peopleList = [person];
            return response(context.json(person));
        }),

        rest.get('/api/people/1000/', (request, response, context) => {
            return response(context.json(person));
        }),
    ];

    const server = setupServer(...handlers);

    beforeAll(() => {
        server.listen();
    });

    beforeEach(() => {
        peopleList = [];
    });

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

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
