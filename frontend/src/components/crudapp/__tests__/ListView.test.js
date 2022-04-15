import React from 'react';
import { render } from 'testing/library';

import { useGetListQuery, useGetRecordQuery } from './utils';

import CrudApp from '../index';
import { ListOfRecords, RecordDetail } from '../containers';

import ListView from '../ListView';

describe('Test displaying the list of records', () => {
    it('should display a list of a records', async () => {
        const details = render(
            <CrudApp {...{ useGetListQuery, useGetRecordQuery }}>
                <ListOfRecords>
                    {(data, isLoading) => {
                        return (
                            <ListView listName='List of records'>
                                {({ title, description }) => (
                                    <ListView.Item
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
