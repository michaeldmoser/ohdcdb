import './people.scss';

import PeopleList from './PeopleList';
import PeopleDetail from './PeopleDetail';
import { Route, Routes } from 'react-router-dom';

const People = () => {
    return (
        <section className='container-fluid'>
            <h3>People</h3>
            <div className='row'>
                <div className='col-7'>
                    <PeopleList />
                </div>
                <div className='col-5'>
                    <Routes>
                        <Route path=':personId' element={<PeopleDetail />} />
                    </Routes>
                </div>
            </div>
        </section>
    );
};

export default People;
