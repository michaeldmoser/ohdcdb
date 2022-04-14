import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    render,
    screen,
    waitForElementToBeRemoved,
    getByText,
} from 'testing/library';
import People from '../index';
import userEvent from '@testing-library/user-event';

describe('Test displaying a person', () => {
    const data = [
        {
            id: 1,
            first_name: 'Patty',
            last_name: 'Moser',
            email: 'patty@example.com',
            date_entered: '2022-03-04T18:25:53.759000Z',
        },
        {
            id: 2,
            first_name: 'Stephen',
            last_name: 'Spears',
            email: 'fmerritt@example.net',
            date_entered: '2022-03-06T13:18:38.978000Z',
        },
        {
            id: 3,
            first_name: 'Felicia',
            last_name: 'Jones',
            email: 'leedavid@example.net',
            date_entered: '2022-03-06T13:18:38.997000Z',
        },
        {
            id: 4,
            first_name: 'Lisa',
            last_name: 'Simpson',
            email: 'kimberly29@example.org',
            date_entered: '2022-03-06T13:18:39.042000Z',
        },
        {
            id: 5,
            first_name: 'David',
            last_name: 'Porter',
            email: 'bjones@example.net',
            date_entered: '2022-03-06T13:18:39.063000Z',
        },
        {
            id: 6,
            first_name: 'Nathan',
            last_name: 'Williams',
            email: 'burgessangela@example.org',
            home: '4065552345',
            mobile: '4065559876',
            date_entered: '2022-03-06T13:18:39.084000Z',
        },
        {
            id: 7,
            first_name: 'Alicia',
            last_name: 'Carter',
            email: 'bnelson@example.net',
            date_entered: '2022-03-06T13:18:39.106000Z',
        },
        {
            id: 8,
            first_name: 'Susan',
            last_name: 'Lyons',
            email: 'barmstrong@example.net',
            date_entered: '2022-03-06T13:18:39.126000Z',
        },
        {
            id: 10,
            first_name: 'Alexander',
            last_name: 'Reyes',
            email: 'michele33@example.com',
            date_entered: '2022-03-06T13:18:39.165000Z',
        },
        {
            id: 11,
            first_name: 'Kimberly',
            last_name: 'Wood',
            email: 'awhite@example.org',
            date_entered: '2022-03-06T13:18:39.184000Z',
        },
    ];

    const handlers = [
        rest.get('/api/people/', (request, response, context) => {
            return response(
                context.status(200),
                context.json(data),
                context.delay(100)
            );
        }),

        rest.get('/api/people/6/', (request, response, context) => {
            return response(
                context.status(200),
                context.json(data[5]),
                context.delay(100)
            );
        }),
    ];

    const server = setupServer(...handlers);

    // Enable API mocking before tests.
    beforeAll(() => {
        server.listen();
    });

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    it('should display the details of the person clicked on', async () => {
        render(<People />);

        const person = data[5]; // Nathan Williams
        await waitForElementToBeRemoved(() =>
            screen.getByText('Loading results...')
        );

        const regx = new RegExp(
            `${person.first_name} ${person.last_name}`,
            'i'
        );

        userEvent.click(
            screen.getByRole('link', {
                name: regx,
            })
        );

        const container = (
            await screen.findByRole('heading', { name: regx, level: 4 })
        ).closest('article');

        expect(
            getByText(container, new RegExp(person.email, 'i'))
        ).toBeInTheDocument();
        expect(
            getByText(container, new RegExp(person.mobile, 'i'))
        ).toBeInTheDocument();
    });
});
