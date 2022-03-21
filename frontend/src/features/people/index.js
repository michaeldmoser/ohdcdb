import './people.scss';

import { Route, Routes } from 'react-router-dom';

import PeopleList from './PeopleList';
import PeopleDetail from './PeopleDetail';
import PeopleHeader from './PeopleHeader';
import AddPerson from './AddPerson';

const People = () => {
    return (
        <section className='container-fluid'>
            <PeopleHeader />
            <div className='row'>
                <div className='col-7'>
                    <PeopleList />
                </div>
                <div className='col-5'>
                    <Routes>
                        <Route path='add-person' element={<AddPerson />} />
                        <Route path=':personId' element={<PeopleDetail />} />
                    </Routes>
                </div>
            </div>
        </section>
    );
};

export default People;
