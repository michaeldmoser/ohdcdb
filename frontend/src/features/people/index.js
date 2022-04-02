import './people.scss';
import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import PeopleList from './PeopleList';
import PersonDetail from './PersonDetail';
import PeopleHeader from './PeopleHeader';
import AddPerson from './AddPerson';
import EditPerson from './EditPerson';

const ListOnly = ({ query }) => {
    return (
        <>
            <div className='col-lg-3 col-12 h-100 overflow-scroll'>
                <PeopleList query={query} />
            </div>
        </>
    );
};

const ListWithDetails = ({ query }) => {
    return (
        <>
            <div className='col-3 d-none d-lg-block h-100 overflow-scroll'>
                <PeopleList query={query} />
            </div>
            <div className='col-12 col-lg-9'>
                <Routes>
                    <Route path='add-person' element={<AddPerson />} />
                    <Route path=':personId' element={<PersonDetail />} />
                    <Route path=':personId/edit' element={<EditPerson />} />
                </Routes>
            </div>
        </>
    );
};

const People = ({ rootPath }) => {
    const [query, setSearchQuery] = useState('');

    return (
        <section className='container-fluid data-view h-100 overflow-hidden'>
            <PeopleHeader query={query} setSearchQuery={setSearchQuery} />
            <div className='card'>
                <div className='row h-100 overflow-hidden'>
                    <Routes>
                        <Route index element={<ListOnly query={query} />} />
                        <Route
                            path='*'
                            element={<ListWithDetails query={query} />}
                        />
                    </Routes>
                </div>
            </div>
        </section>
    );
};

export default People;
