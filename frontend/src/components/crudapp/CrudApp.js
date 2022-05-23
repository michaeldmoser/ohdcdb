import React, { useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';

import Context from './context';

import {
    ListOfRecords,
    RecordDetail,
    RecordWithSearchResults,
} from './containers';

import Header from './Header';
import RecordForm, { AddRecord, EditRecord } from './RecordForm';

const CrudApp = ({
    to = '',
    children,
    useGetRecordsQuery,
    useGetRecordQuery,
    useAddRecordMutation,
    useEditRecordMutation,
    ...rest
}) => {
    const [search, setSearch] = useState('');
    const listQuery = useGetRecordsQuery(search);

    const parentPath = to[to.length - 1] === '/' ? to : to + '/';
    const match = useMatch({ path: `${parentPath}:recordId/*` });
    const recordId = match?.params?.recordId;
    const detailQuery = useGetRecordQuery(
        !recordId || recordId === 'add' ? skipToken : recordId
    );
    const [addRecord] = useAddRecordMutation();
    const [editRecord] = useEditRecordMutation();

    const kids = React.Children.toArray(children);
    const recordlist = kids.find(({ type }) => type === ListOfRecords);
    const recordview = kids.find(({ type }) => type === RecordDetail);
    const header = kids.find(({ type }) => type === Header);
    const recordform = kids.find(({ type }) => type === RecordForm);
    const addrecordview = kids.find(({ type }) => type === AddRecord);
    const editrecordview = kids.find(({ type }) => type === EditRecord);

    return (
        <Context.Provider
            value={{
                search,
                setSearch,
                recordId,
                listQuery,
                detailQuery,
                addRecord,
                editRecord,
                recordform,
                ...rest,
            }}
        >
            <section className='container-fluid data-view h-100 overflow-hidden'>
                {header}
                <div className='row crudapp-body overflow-hidden'>
                    <Routes>
                        {/* <Route
                                index
                                element={<ListOnly>{recordlist}</ListOnly>}
                            /> */}
                        <Route
                            path='*'
                            element={
                                <RecordWithSearchResults listview={recordlist}>
                                    {recordview}
                                </RecordWithSearchResults>
                            }
                        >
                            <Route path='add' element={addrecordview} />

                            <Route path=':recordId' element={recordview} />
                            <Route
                                path=':recordId/edit'
                                element={editrecordview}
                            />
                        </Route>
                    </Routes>
                </div>
            </section>
        </Context.Provider>
    );
};

export default CrudApp;
