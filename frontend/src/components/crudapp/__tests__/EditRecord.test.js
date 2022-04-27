import React from 'react';
import {
    render,
    screen,
    getByText,
    getByRole,
    userEvent,
    act,
} from 'testing/library';

import { setupServer } from 'msw/node';

import { resetDatabase, SUT, database, handlers } from './utils';

const openEditRecordForm = async (title) => {
    userEvent.click(await screen.findByRole('button', { name: /Edit/i }));
};

const fillOutFormTheForm = async ({ title, description }) => {
    title && userEvent.type(await screen.findByLabelText(/Title/i), title);
    description &&
        userEvent.type(
            await screen.findByLabelText(/Description/i),
            description
        );
};

const submitTheForm = () => {
    userEvent.click(screen.getByRole('button', { name: /Save/i }));
};

describe('Editing an existing record', () => {
    let updatedRecord = { ...database[0] };
    let originalRecord = { ...database[0] };
    const server = setupServer(...handlers);

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    beforeEach(() => {
        resetDatabase();
        updatedRecord = { ...database[0] };
        updatedRecord.title = 'Title 1';
        updatedRecord.description = 'Description 1';
    });

    async function runEditPersonProcess() {
        render(<SUT />, {
            initialEntries: ['/1'],
        });

        await act(async () => {
            await openEditRecordForm(originalRecord.title);
            await fillOutFormTheForm(updatedRecord);
            submitTheForm();
        });

        const regx = new RegExp(updatedRecord.title, 'i');
        const container = (
            await screen.findByRole('heading', {
                name: regx,
                level: 4,
            })
        ).closest('article');

        return container;
    }

    it('should display a title', async () => {
        render(<SUT />, {
            initialEntries: [`/${originalRecord.id}/edit`],
        });

        expect(
            await screen.findByRole(
                'heading',
                {
                    name: new RegExp(`Update ${originalRecord.title}`, 'i'),
                },
                { timeout: 4000 }
            )
        ).toBeInTheDocument();
    });

    it('should display details of newly created record', async () => {
        const container = await runEditPersonProcess();

        expect(
            getByRole(container, 'definition', {
                name: new RegExp(updatedRecord.title, 'i'),
            })
        ).toBeInTheDocument();
        expect(
            getByText(container, new RegExp(updatedRecord.description, 'i'))
        ).toBeInTheDocument();
    });

    it('should list the new record in the list', async () => {
        await runEditPersonProcess();

        const regx = new RegExp(updatedRecord.title, 'i');

        expect(
            await screen.findByRole('link', {
                name: regx,
            })
        ).toBeInTheDocument();
    });
});
