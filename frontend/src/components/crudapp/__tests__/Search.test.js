import React from 'react';
import { render, screen } from 'testing/library';
import userEvent from '@testing-library/user-event';

import { queryResult, database } from './utils';

import CrudApp from '../index';
import { ListOfRecords, RecordDetail } from '../containers';

import ListView, { ListItem } from '../ListView';

describe('Test filtering the list of records', () => {
    const useGetListQuery = (search) => {
        const filtered = search
            ? search.filter((record) => record.title.includes(search))
            : database;

        return queryResult(filtered);
    };

    const useGetRecordQuery = (recordId, options) => {
        return queryResult(options?.skip ? undefined : database[1]);
    };

    it('should display a filtered list of a records', async () => {
        const search = render(
            <CrudApp {...{ useGetListQuery, useGetRecordQuery }}>
                <ListOfRecords>
                    {(data, isLoading) => {
                        return (
                            <ListView listName='List of records'>
                                {({ title, description }) => (
                                    <ListItem
                                        name={title}
                                        additionalInfo={description}
                                    />
                                )}
                            </ListView>
                        );
                    }}
                </ListOfRecords>
                <RecordDetail>
                    {({ data, isLoading }) => {
                        return <div />;
                    }}
                </RecordDetail>
            </CrudApp>,
            {
                initialEntries: ['/'],
            }
        );

        userEvent.type(screen.getByPlaceholderText(/Search.../i), 'LLC');

        const container = (
            await screen.findByRole('heading', {
                name: /list of people/i,
            })
        ).closest('article');

        expect(container).toMatchSnapshot();
    });
});
