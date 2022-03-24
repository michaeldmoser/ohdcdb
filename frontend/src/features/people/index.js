import './people.scss';

import { Route, Routes } from 'react-router-dom';

import PeopleList from './PeopleList';
import PeopleDetail from './PeopleDetail';
import PeopleHeader from './PeopleHeader';
import AddPerson from './AddPerson';

const People = () => {
    return (
        <section className='container-fluid data-view'>
            <PeopleHeader />
            <div className='card'>
                <div className='row'>
                    <div className='col-3'>
                        <PeopleList />
                    </div>
                    <div className='col-9'>
                        <Routes>
                            <Route path='add-person' element={<AddPerson />} />
                            <Route
                                path=':personId'
                                element={<PeopleDetail />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default People;
