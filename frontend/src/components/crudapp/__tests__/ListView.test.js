import React from 'react';
import { render } from 'testing/library';

import { queryResult, database } from './utils';

import CrudApp from '../index';
import { ListOfRecords, RecordDetail } from '../containers';

import ListView, { ListItem } from '../ListView';

describe('Test displaying the list of records', () => {
    const useGetListQuery = (search) => {
        return queryResult(database);
    };

    const useGetRecordQuery = (recordId) => {
        return queryResult(database[1]);
    };

    it('should display a list of a records', async () => {
        const details = render(
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

        expect(details).toMatchSnapshot();
    });
});
