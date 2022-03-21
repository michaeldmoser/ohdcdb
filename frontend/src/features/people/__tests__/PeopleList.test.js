import React from 'react';
import { setupServer } from 'msw/node';
import { render, screen } from 'testing/library';

import { baseHandlers, peopleList } from './utils';

import People from '../index';

describe('Test displaying a list of people', () => {
    const handlers = baseHandlers;

    const server = setupServer(...handlers);

    // Enable API mocking before tests.
    beforeAll(() => {
        server.listen();
    });

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    it.each(peopleList)(
        'should show each person from the data returned in the api',
        async (person) => {
            render(<People />);
            expect(await screen.findByText(person.email)).toBeInTheDocument();
        }
    );
});
