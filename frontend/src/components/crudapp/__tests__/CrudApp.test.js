import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import {
    screen,
    getByText,
    getAllByText,
    findAllByRole,
    getByRole,
} from 'testing/library';

import { database, setupServer, resetDatabase, renderSUT } from './utils';

const server = setupServer();

beforeAll(() => {
    server.listen();
});

beforeEach(() => {
    resetDatabase();
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => server.close());

it('should display the details of a record', async () => {
    const record = database[1];

    renderSUT(`/${record.id}`);

    const title = await screen.findByText('Title');
    const container = title.closest('article');

    expect(title).toBeInTheDocument();
    expect(getByText(container, 'Description')).toBeInTheDocument();

    expect(getAllByText(container, record.title)[0]).toBeInTheDocument();
    expect(getByText(container, record.description)).toBeInTheDocument();
});

it('should display a list of a records', async () => {
    renderSUT('/');

    const articleHeading = await screen.findByRole('heading', {
        name: /list of records/i,
    });
    const article = articleHeading.closest('article');
    const records = await findAllByRole(article, 'listitem');

    expect(records.length).toEqual(database.length);
});

it('should display a filtered list of a records', async () => {
    renderSUT('/');

    userEvent.type(screen.getByPlaceholderText(/Search.../i), 'LLC');

    const articleHeading = await screen.findByRole('heading', {
        name: /list of records/i,
    });
    const article = articleHeading.closest('article');
    const records = await findAllByRole(article, 'listitem');

    expect(records.length).toEqual(1);
});

describe('Adding a record to the database', () => {
    const record = {
        id: 1000,
        title: 'Title 1',
        description: 'Description 1',
    };

    const openAddRecordForm = () => {
        userEvent.click(screen.getByRole('button', { name: /Add record/i }));
    };

    it('should display a title', () => {
        renderSUT('/add');

        expect(
            screen.getByRole('heading', { name: /Add record/i })
        ).toBeInTheDocument();
    });

    testDataEntryProcess(openAddRecordForm, '/', record);
});

describe('Editing an existing record', () => {
    let updatedRecord = { ...database[0] };
    let originalRecord = { ...database[0] };

    updatedRecord.title = 'Title 1';
    updatedRecord.description = 'Description 1';

    const openEditRecordForm = async () => {
        userEvent.click(await screen.findByRole('button', { name: /Edit/i }));
    };

    it('should display a title', async () => {
        renderSUT(`/${originalRecord.id}/edit`);

        expect(
            await screen.findByRole('heading', {
                name: new RegExp(`Update ${originalRecord.title}`, 'i'),
            })
        ).toBeInTheDocument();
    });

    testDataEntryProcess(openEditRecordForm, '/1', updatedRecord);
});

function testDataEntryProcess(openDataEntryForm, url, record) {
    async function runDataEntryProcess() {
        renderSUT(url);

        await act(async () => {
            await openDataEntryForm();
            await fillOutFormTheForm(record);
            submitTheForm();
        });
        const container = await findDetailViewContainer(record);

        return container;
    }

    it('should display details of the record', async () => {
        const container = await runDataEntryProcess();

        expect(
            getByRole(container, 'definition', {
                name: new RegExp(record.title, 'i'),
            })
        ).toBeInTheDocument();
        expect(
            getByText(container, new RegExp(record.description, 'i'))
        ).toBeInTheDocument();
    });

    it('should list the record', async () => {
        await runDataEntryProcess();

        const regx = new RegExp(record.title, 'i');
        expect(
            await screen.findByRole('link', {
                name: regx,
            })
        ).toBeInTheDocument();
    });
}

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

async function findDetailViewContainer(record) {
    const regx = new RegExp(record.title, 'i');
    const container = (
        await screen.findByRole('heading', {
            name: regx,
            level: 4,
        })
    ).closest('article');

    return container;
}
