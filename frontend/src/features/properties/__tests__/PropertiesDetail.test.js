import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    render,
    screen,
    waitForElementToBeRemoved,
    getByText,
} from 'testing/library';
import userEvent from '@testing-library/user-event';

import { baseHandlers, propertyList } from './utils';
import Properties from '../index';

describe('Test displaying a property', () => {
    const server = setupServer(...baseHandlers);

    // Enable API mocking before tests.
    beforeAll(() => {
        server.listen();
    });

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    it('should display the details of the property clicked on', async () => {
        render(<Properties />);

        const property = propertyList[5];
        await waitForElementToBeRemoved(() =>
            screen.getByText('Loading results...')
        );

        const regx = new RegExp(
            `${property.address1} ${property.address2}`,
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
            getByText(container, new RegExp(property.acres, 'i'))
        ).toBeInTheDocument();
        expect(
            getByText(container, new RegExp(property.postalcode, 'i'))
        ).toBeInTheDocument();
    });
});
