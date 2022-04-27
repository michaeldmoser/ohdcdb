import React from 'react';
import { render, screen } from 'testing/library';
import userEvent from '@testing-library/user-event';

import {
    useGetListQuery,
    useGetRecordQuery,
    useAddRecordMutation,
} from './utils';

import CrudApp, {
    ListOfRecords,
    RecordDetail,
    ListView,
    Header,
} from '../index';

describe('Test filtering the list of records', () => {
    it('should display a filtered list of a records', async () => {
        const details = render(
            <CrudApp
                {...{
                    useGetListQuery,
                    useGetRecordQuery,
                    useAddRecordMutation,
                }}
            >
                <Header />
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

        userEvent.type(screen.getByPlaceholderText(/Search.../i), 'LLC');

        expect(details).toMatchSnapshot();
    });
});
