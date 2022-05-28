import React from 'react';
import { render, screen } from 'testing/library';

import { propertyList, setupPropertiesBackend } from './utils';

import Properties from '../index';

describe('Test displaying a list of people', () => {
    setupPropertiesBackend();

    it.each(propertyList)(
        'should show each property from the data returned in the api',
        async (property) => {
            render(<Properties />);
            expect(
                await screen.findByText(property.address1)
            ).toBeInTheDocument();
        }
    );
});
