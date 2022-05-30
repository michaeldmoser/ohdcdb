import React from 'react';
import {
    render,
    screen,
    waitForElementToBeRemoved,
    getByText,
} from 'testing/library';
import userEvent from '@testing-library/user-event';

import { organizationList, setupOrganizationsBackend } from './utils';

import Organizations from '../index';

describe('Test displaying a property', () => {
    setupOrganizationsBackend();

    it('should display the details of the organization clicked on', async () => {
        render(<Organizations />);

        const organization = organizationList[5];
        await waitForElementToBeRemoved(() =>
            screen.getByText('Loading results...')
        );

        const regx = new RegExp(organization.name, 'i');

        userEvent.click(
            screen.getByRole('link', {
                name: regx,
            })
        );

        const container = (
            await screen.findByRole('heading', { name: regx, level: 4 })
        ).closest('section');

        expect(
            getByText(container, new RegExp(organization.contact_name, 'i'))
        ).toBeInTheDocument();
        expect(
            getByText(container, new RegExp(organization.contact_email, 'i'))
        ).toBeInTheDocument();
        expect(
            getByText(container, new RegExp(organization.contact_phone, 'i'))
        ).toBeInTheDocument();
    });
});
