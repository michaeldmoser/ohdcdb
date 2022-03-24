import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    render,
    screen,
    getByText,
    waitForElementToBeRemoved,
} from 'testing/library';
import userEvent from '@testing-library/user-event';

import AddPerson from '../AddPerson';
import People from '../index';

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

    const fillOutFormTheForm = async () => {
        userEvent.click(screen.getByRole('button', { name: 'Add Person' }));
        userEvent.type(
            await screen.findByLabelText(/First Name/i),
            person.first_name
        );
        userEvent.type(
            await screen.findByLabelText(/Last Name/i),
            person.last_name
        );
        userEvent.type(
            await screen.findByLabelText(/Mobile Phone/i),
            person.mobile
        );
        userEvent.type(await screen.findByLabelText(/Email/i), person.email);
    };

    const submitTheForm = () => {
        userEvent.click(screen.getByRole('button', { name: /Save/i }));
    };

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

        await fillOutFormTheForm();
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

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
        await fillOutFormTheForm();
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
