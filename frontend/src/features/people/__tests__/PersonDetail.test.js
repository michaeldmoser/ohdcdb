import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    render,
    screen,
    waitForElementToBeRemoved,
    getByText,
} from 'testing/library';
import { peopleList, setupPeopleBackend } from './utils';
import userEvent from '@testing-library/user-event';

import People from '../index';

describe('Test displaying a person', () => {
    setupPeopleBackend();
    const person = peopleList[0];

    it('should display the details of the person clicked on', async () => {
        render(<People />);

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

describe('Search for people in the database', () => {
    setupPeopleBackend();
    const person = peopleList[0];

    beforeEach(async () => {
        render(<People />, {
            initialEntries: [`/${person.id}`],
        });

        await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    });

    it('should list the related properties with links to their location in google maps', async () => {
        expect(
            screen.getByRole('link', {
                name: person.properties_set[0].address1,
            })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', {
                name: person.properties_set[1].address1,
            })
        ).toBeInTheDocument();
    });

    it('should have a link to a google map showing the location of the property', () => {
        const mapLink1 = screen.getByRole('link', {
            name: `Location of ${person.properties_set[0].address1}`,
        });
        expect(mapLink1).toBeInTheDocument();
        expect(mapLink1).toHaveAttribute(
            'href',
            'https://www.google.com/maps/place/' +
                person.properties_set[0].address1.replace(/ /g, '+') +
                ',Missoula,MT'
        );
    });
});
