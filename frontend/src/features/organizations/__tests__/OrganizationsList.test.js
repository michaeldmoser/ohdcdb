import React from 'react';
import { render, screen } from 'testing/library';

import { organizationList, setupOrganizationsBackend } from './utils';

import Organizations from '../index';

describe('Test displaying a list of organizations', () => {
    setupOrganizationsBackend();

    it.each(organizationList)(
        'should show each organization from the data returned in the api',
        async (organization) => {
            render(<Organizations />);
            expect(
                await screen.findByText(organization.name)
            ).toBeInTheDocument();
        }
    );
});
