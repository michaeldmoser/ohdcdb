import React from 'react';

import { render } from 'testing/library';
import Card from '../Cards';

describe('Rendering cards', () => {
    it('should render a bootstrap card', () => {
        const rendered = render(<Card header='Test Header' body='Test body' />);

        expect(rendered).toMatchSnapshot();
    });

    it('should render a bootstrap card with h-100 class', () => {
        const rendered = render(
            <Card header='Test Header' body='Test body' fullHeight={true} />
        );

        expect(rendered).toMatchSnapshot();
    });
});
