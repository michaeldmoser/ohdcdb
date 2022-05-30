import { faker } from '@faker-js/faker';

import setupBackend from 'testing/backend';

export const organizationList = Array.from({ length: 10 }, (v, index) => ({
    id: index + 1,
    name: faker.company.companyName(),
    contact_name: faker.name.findName(),
    contact_phone: faker.phone.phoneNumber('406-555-###'),
    contact_email: faker.internet.email(),
    date_entered: faker.date.past(),
}));

export const setupOrganizationsBackend = () =>
    setupBackend(
        organizationList,
        'organizations',
        (search) =>
            ({ name }) =>
                name.includes(search)
    );
