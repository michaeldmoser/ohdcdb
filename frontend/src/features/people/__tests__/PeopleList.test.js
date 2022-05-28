import React from 'react';
import { render, screen } from 'testing/library';

import { setupPeopleBackend, peopleList } from './utils';

import People from '../index';

describe('Test displaying a list of people', () => {
    setupPeopleBackend();

    it.each(peopleList)(
        'should show each person from the data returned in the api',
        async (person) => {
            render(<People />);
            expect(await screen.findByText(person.email)).toBeInTheDocument();
        }
    );
});
