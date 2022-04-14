import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Context from './context';

import {
    ListOfRecords,
    RecordDetail,
    RecordWithSearchResults,
} from './containers';

const CrudApp = ({ children, useGetListQuery, useGetRecordQuery, ...rest }) => {
    const [search, setSearch] = useState('');
    const [recordId, setRecordId] = useState(null);
    const listQuery = useGetListQuery(search);
    const detailQuery = useGetRecordQuery(recordId, { skip: !recordId });

    const kids = React.Children.toArray(children);
    const recordlist = kids.find(({ type }) => type === ListOfRecords);
    const recordview = kids.find(({ type }) => type === RecordDetail);

    return (
        <Context.Provider
            value={{
                search,
                setSearch,
                recordId,
                setRecordId,
                listQuery,
                detailQuery,
                ...rest,
            }}
        >
            <section className='container-fluid data-view h-100 overflow-hidden'>
                {/* <PropertiesHeader search={search} setSearchQuery={setSearch} /> */}
                <div className='card'>
                    <div className='row h-100 overflow-hidden'>
                        <Routes>
                            {/* <Route
                                index
                                element={<ListOnly>{recordlist}</ListOnly>}
                            /> */}
                            <Route
                                path='*'
                                element={
                                    <RecordWithSearchResults
                                        listview={recordlist}
                                    >
                                        {recordview}
                                    </RecordWithSearchResults>
                                }
                            >
                                {/* <Route path='add' element={<AddProperty />} /> */}
                                <Route path=':recordId' element={recordview} />
                                {/* <Route
                                    path=':recordId/edit'
                                    element={<EditProperty />}
                                /> */}
                            </Route>
                        </Routes>
                    </div>
                </div>
            </section>
        </Context.Provider>
    );
};

export default CrudApp;
