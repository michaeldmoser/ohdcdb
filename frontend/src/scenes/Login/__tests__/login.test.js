import React from 'react';
import { render } from 'test-utils';
import '@testing-library/jest-dom';

import Login from '../';

describe('<Login />', () => {
    const { asFragment } = render(<Login />);

    it('renders the login page', () => {
        expect(asFragment()).toMatchSnapshot();
    });
});
