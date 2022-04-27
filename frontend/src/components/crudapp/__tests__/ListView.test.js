import React from 'react';
import { render } from 'testing/library';

import {
    useGetListQuery,
    useGetRecordQuery,
    useAddRecordMutation,
} from './utils';

import CrudApp, { ListView } from '../index';
import { ListOfRecords, RecordDetail } from '../containers';

describe('Test displaying the list of records', () => {
    it('should display a list of a records', async () => {
        const details = render(
            <CrudApp
                {...{
                    useGetListQuery,
                    useGetRecordQuery,
                    useAddRecordMutation,
                }}
            >
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
