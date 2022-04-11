import { rest } from 'msw';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

import { faker } from '@faker-js/faker';

export const propertyList = Array.from({ length: 10 }, (v, index) => ({
    id: index + 1,
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    postalcode: faker.random.arrayElement(['59801', '59804', '59802']),
    acres: faker.datatype.number({ max: 10, min: 0.001, precision: 0.001 }),
}));

export const baseHandlers = [
    rest.get('/api/properties/', (request, response, context) => {
        const search = request.url.searchParams.get('search');

        const results = search
            ? propertyList.filter(({ address1 }) => address1.includes(search))
            : propertyList;

        return response(
            context.status(200),
            context.json(results),
            context.delay(1)
        );
    }),
];
