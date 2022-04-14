import React from 'react';
import { render } from 'testing/library';

import { queryResult, database } from './utils';

import CrudApp from '../index';
import { ListOfRecords, RecordDetail } from '../containers';
import DetailsView, { Body, Field, Header } from '../DetailsView';

describe('Test displaying a record', () => {
    const useGetListQuery = (search) => {
        return queryResult(database);
    };

    const useGetRecordQuery = (recordId) => {
        return queryResult([1]);
    };

    it('should display the details of a record', async () => {
        const details = render(
            <CrudApp {...{ useGetListQuery, useGetRecordQuery }}>
                <ListOfRecords>
                    {(props) => {
                        return <div />;
                    }}
                </ListOfRecords>
                <RecordDetail>
                    {({ data, isLoading }) => {
                        return (
                            <DetailsView>
                                <Body>
                                    <Field value={data.title} label='Title' />
                                    <Field
                                        value={data.description}
                                        label='Description'
                                    />
                                </Body>
                                <Header>{data.title}</Header>
                            </DetailsView>
                        );
                    }}
                </RecordDetail>
            </CrudApp>,
            {
                initialEntries: ['/2'],
            }
        );

        expect(details).toMatchSnapshot();
    });
});
