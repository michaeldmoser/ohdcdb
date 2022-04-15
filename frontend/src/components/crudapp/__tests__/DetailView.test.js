import React from 'react';
import { render } from 'testing/library';

import { queryResult, database } from './utils';

import CrudApp from '../index';
import { ListOfRecords, RecordDetail } from '../containers';
import DetailsView from '../DetailsView';

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
                                <DetailsView.Body>
                                    <DetailsView.Field
                                        value={data.title}
                                        label='Title'
                                    />
                                    <DetailsView.Field
                                        value={data.description}
                                        label='Description'
                                    />
                                </DetailsView.Body>
                                <DetailsView.Header>
                                    {data.title}
                                </DetailsView.Header>
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
