import './people.scss';
import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import CrudApp, {
    ListOfRecords,
    RecordDetail,
    Header,
} from 'components/crudapp';

import { useGetPeopleQuery, useGetPersonQuery } from './api';

import PeopleList from './PeopleList';
import PersonDetail from './PersonDetail';
import AddPerson from './AddPerson';
import EditPerson from './EditPerson';

const People = () => {
    return (
        <CrudApp
            useGetListQuery={useGetPeopleQuery}
            useGetRecordQuery={useGetPersonQuery}
        >
            <Header
                title='People'
                addButtonText='Add Person'
                searchPlaceholder='Search people'
            />
            <ListOfRecords>
                {(query) => <PeopleList {...query} />}
            </ListOfRecords>
            <RecordDetail>
                {(query) => <PersonDetail {...query} />}
            </RecordDetail>
        </CrudApp>
    );

    // return (
    //     <section className='container-fluid data-view h-100 overflow-hidden'>
    //         <PeopleHeader query={query} setSearchQuery={setSearchQuery} />
    //         <div className='card'>
    //             <div className='row h-100 overflow-hidden'>
    //                 <Routes>
    //                     <Route index element={<ListOnly query={query} />} />
    //                     <Route
    //                         path='*'
    //                         element={<ListWithDetails query={query} />}
    //                     />
    //                 </Routes>
    //             </div>
    //         </div>
    //     </section>
    // );
};

export default People;
