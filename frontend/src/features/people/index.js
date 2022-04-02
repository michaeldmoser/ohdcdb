import './people.scss';
import { useState } from 'react';

import {
    Route,
    Routes,
    useLocation,
    useMatch,
    matchPath,
} from 'react-router-dom';

import PeopleList from './PeopleList';
import PersonDetail from './PersonDetail';
import PeopleHeader from './PeopleHeader';
import AddPerson from './AddPerson';
import EditPerson from './EditPerson';

const ListOnly = ({ query }) => {
    return (
        <>
            <div className='col-md-3 col-12'>
                <PeopleList query={query} />
            </div>
        </>
    );
};

const ListWithDetails = ({ query }) => {
    return (
        <>
            <div className='col-3 d-none d-lg-block'>
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
        <section className='container-fluid data-view'>
            <PeopleHeader query={query} setSearchQuery={setSearchQuery} />
            <div className='card'>
                <div className='row'>
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
