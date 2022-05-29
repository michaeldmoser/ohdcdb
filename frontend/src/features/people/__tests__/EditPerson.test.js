import React from 'react';
import { render, screen, getByText } from 'testing/library';
import {
    peopleList,
    fillOutFormTheForm,
    submitTheForm,
    setupPeopleBackend,
} from './utils';

import People from '../index';

describe('Change some details about a person', () => {
    let person = { ...peopleList[6] };
    setupPeopleBackend();

    it("should be able to change a person's details", async () => {
        render(<People />, {
            rootPath: '/people/*',
            initialEntries: [`/people/${person.id}/edit`],
        });

        const updatedDetails = {
            first_name: 'Firstname',
            last_name: 'Lastname',
            email: 'email@example.com',
            mobile: '406-555-7474',
        };

        await fillOutFormTheForm(updatedDetails);
        submitTheForm();

        const regx = new RegExp(
            `${updatedDetails.first_name} ${updatedDetails.last_name}`,
            'i'
        );
        const container = (
            await screen.findByRole('heading', {
                name: regx,
                level: 4,
            })
        ).closest('article');

        expect(
            getByText(container, new RegExp(updatedDetails.email, 'i'))
        ).toBeInTheDocument();
        expect(
            getByText(container, new RegExp(updatedDetails.mobile, 'i'))
        ).toBeInTheDocument();
    });

    it("should populate the form fields with the person's data", async () => {
        render(<People />, {
            rootPath: '/people/*',
            initialEntries: [`/people/${person.id}/edit`],
        });

        expect(
            await screen.findByRole('textbox', {
                name: /first name/i,
            })
        ).toHaveValue(person.first_name);
        expect(
            await screen.findByRole('textbox', {
                name: /last name/i,
            })
        ).toHaveValue(person.last_name);
        expect(
            await screen.findByRole('textbox', {
                name: /email address/i,
            })
        ).toHaveValue(person.email);
        expect(
            await screen.findByRole('textbox', {
                name: /mobile phone/i,
            })
        ).toHaveValue(person.mobile);
    });

    it('should update the list of people', async () => {
        render(<People />, {
            rootPath: '/people/*',
            initialEntries: [`/people/${person.id}/edit`],
        });

        const updatedDetails = {
            first_name: 'Firstname',
            last_name: 'Lastname',
            email: 'email@example.com',
            mobile: '406-555-7474',
        };

        await fillOutFormTheForm(updatedDetails);
        submitTheForm();

        const regx = new RegExp(
            `${updatedDetails.first_name} ${updatedDetails.last_name}`,
            'i'
        );

        expect(
            await screen.findByRole('link', {
                name: regx,
            })
        ).toBeInTheDocument();
    });
});
