import { rest } from 'msw';

import { faker } from '@faker-js/faker';

import setupBackend from 'testing/backend';

export const propertyList = Array.from({ length: 10 }, (v, index) => ({
    id: index + 1,
    address1: faker.address.streetAddress(),
    address2: faker.address.secondaryAddress(),
    postalcode: faker.random.arrayElement(['59801', '59804', '59802']),
    acres: faker.datatype.number({ max: 10, min: 0.001, precision: 0.001 }),
    owners: [
        {
            id: (index + 1) ** 2 + index, // Let's make sure we get a very unique number
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
        },
        {
            id: (index + 2) ** 2 + index, // Let's make sure we get a very unique number
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
        },
    ],
}));

export const setupPropertiesBackend = () =>
    setupBackend(
        propertyList,
        'properties',
        (search) =>
            ({ address1 }) =>
                address1.includes(search)
    );
