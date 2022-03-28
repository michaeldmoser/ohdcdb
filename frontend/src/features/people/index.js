import './people.scss';
import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import PeopleList from './PeopleList';
import PersonDetail from './PersonDetail';
import PeopleHeader from './PeopleHeader';
import AddPerson from './AddPerson';
import EditPerson from './EditPerson';

const People = () => {
    const [query, setSearchQuery] = useState('');

    return (
        <section className='container-fluid data-view'>
            <PeopleHeader query={query} setSearchQuery={setSearchQuery} />
            <div className='card'>
                <div className='row'>
                    <div className='col-3'>
                        <PeopleList query={query} />
                    </div>
                    <div className='col-9'>
                        <Routes>
                            <Route path='add-person' element={<AddPerson />} />
                            <Route
                                path=':personId'
                                element={<PersonDetail />}
                            />
                            <Route
                                path=':personId/edit'
                                element={<EditPerson />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default People;
