import { rest } from 'msw';
import setupBackend from 'testing/backend';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

export const peopleList = [
    {
        id: 1,
        first_name: 'Patty',
        last_name: 'Moser',
        email: 'patty@example.com',
        mobile: '406-555-1234',
        date_entered: '2022-03-04T18:25:53.759000Z',
        properties_set: [
            {
                id: 25,
                address1: '545 Some St',
                address2: '',
                postalcode: '59801',
                acres: '3.510',
                date_entered: '2022-05-12T12:16:01.312580Z',
                owners: [1],
            },
            {
                id: 2,
                address1: '545 Nicholas Green',
                address2: '',
                postalcode: '59801',
                acres: '0.510',
                date_entered: '2022-05-12T12:16:01.312580Z',
                owners: [1],
            },
        ],
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
        date_entered: '2022-03-06T13:18:39.084000Z',
    },
    {
        id: 7,
        first_name: 'Alicia',
        last_name: 'Carter',
        email: 'bnelson@example.net',
        mobile: '406-555-1234',
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

export const baseHandlers = [
    rest.get('/api/people/', (request, response, context) => {
        const search = request.url.searchParams.get('search');

        const results = search
            ? peopleList.filter(({ first_name, last_name, email }) =>
                  [first_name, last_name, email].join(' ').includes(search)
              )
            : peopleList;

        return response(
            context.status(200),
            context.json(results),
            context.delay(1)
        );
    }),
    rest.get('/api/people/:recordId/', (request, response, context) => {
        const { recordId } = request.params;

        const person = peopleList.find(
            (person) => person.id === parseInt(recordId)
        );

        return response(
            context.status(person ? 200 : 404),
            context.json(
                person || {
                    detail: 'Not found.',
                }
            ),
            context.delay(1)
        );
    }),
];

export const setupPeopleBackend = () =>
    setupBackend(
        peopleList,
        'people',
        (search) =>
            ({ first_name, last_name, email }) =>
                [first_name, last_name, email].join(' ').includes(search)
    );

export const openAddPersonForm = () => {
    userEvent.click(screen.getByRole('button', { name: 'Add Person' }));
};

export const fillOutFormTheForm = async ({
    first_name,
    last_name,
    email,
    mobile,
}) => {
    first_name &&
        userEvent.type(await screen.findByLabelText(/First Name/i), first_name);
    last_name &&
        userEvent.type(await screen.findByLabelText(/Last Name/i), last_name);
    mobile &&
        userEvent.type(await screen.findByLabelText(/Mobile Phone/i), mobile);
    email && userEvent.type(await screen.findByLabelText(/Email/i), email);
};

export const submitTheForm = () => {
    userEvent.click(screen.getByRole('button', { name: /Save/i }));
};
