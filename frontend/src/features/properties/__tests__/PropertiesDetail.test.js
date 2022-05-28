import React from 'react';
import {
    render,
    screen,
    waitForElementToBeRemoved,
    getByText,
} from 'testing/library';
import userEvent from '@testing-library/user-event';

import { propertyList, setupPropertiesBackend } from './utils';
import Properties from '../index';

describe('Test displaying a property', () => {
    setupPropertiesBackend();

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
        ).closest('section');

        expect(
            getByText(container, new RegExp(property.acres, 'i'))
        ).toBeInTheDocument();
        expect(
            getByText(container, new RegExp(property.postalcode, 'i'))
        ).toBeInTheDocument();
    });

    it('should display a list of property owners as links', async () => {
        const property = propertyList[5];
        render(<Properties />, { initialEntries: [`/${property.id}`] });

        expect(
            await screen.findByRole('link', {
                name: new RegExp(
                    `${property.owners[0].first_name} ${property.owners[0].last_name}`,
                    'i'
                ),
            })
        ).toBeInTheDocument();

        expect(
            await screen.findByRole('link', {
                name: new RegExp(
                    `${property.owners[1].first_name} ${property.owners[1].last_name}`,
                    'i'
                ),
            })
        ).toBeInTheDocument();
    });
});
