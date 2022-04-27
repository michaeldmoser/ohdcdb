import React from 'react';
import {
    render,
    screen,
    getByText,
    getByRole,
    userEvent,
} from 'testing/library';
import { setupServer } from 'msw/node';
import { act } from 'react-dom/test-utils';

import { resetDatabase, SUT, handlers } from './utils';

const openAddPersonForm = () => {
    userEvent.click(screen.getByRole('button', { name: /Add record/i }));
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

describe('Adding a record to the database', () => {
    const addFormTitle = 'Add record';

    const record = {
        id: 1000,
        title: 'Title 1',
        description: 'Description 1',
    };

    async function runAddPersonProcess() {
        render(<SUT />, {
            initialEntries: ['/'],
        });

        await act(async () => {
            openAddPersonForm();
            await fillOutFormTheForm(record);
            submitTheForm();
        });
        const regx = new RegExp(record.title, 'i');
        const container = (
            await screen.findByRole('heading', {
                name: regx,
                level: 4,
            })
        ).closest('article');

        return container;
    }

    const server = setupServer(...handlers);

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => server.close());

    beforeEach(() => {
        resetDatabase();
    });

    it('should display a title', () => {
        render(<SUT />, {
            initialEntries: ['/add'],
        });

        expect(
            screen.getByRole('heading', { name: new RegExp(addFormTitle, 'i') })
        ).toBeInTheDocument();
    });

    it('should display details of newly created record', async () => {
        const container = await runAddPersonProcess();

        expect(
            getByRole(container, 'definition', {
                name: new RegExp(record.title, 'i'),
            })
        ).toBeInTheDocument();
        expect(
            getByText(container, new RegExp(record.description, 'i'))
        ).toBeInTheDocument();
    });

    it('should list the new record in the list', async () => {
        await runAddPersonProcess();

        const regx = new RegExp(record.title, 'i');
        await screen.findByRole('heading', {
            name: regx,
            level: 4,
        });

        expect(
            await screen.findByRole('link', {
                name: regx,
            })
        ).toBeInTheDocument();
    });
});
