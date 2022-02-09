import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Login } from '../Login';

describe('<Login />', () => {
    const { asFragment } = render(<Login />);

    it('renders the login page', () => {
        expect(asFragment()).toMatchSnapshot();
    });
});
