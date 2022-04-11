import './properties.scss';
import { useState } from 'react';

import { Route, Routes } from 'react-router-dom';

import PropertiesList from './PropertiesList';
import PropertyDetail from './PropertyDetail';
import PropertiesHeader from './PropertiesHeader';
import AddProperty from './AddProperty';
import EditProperty from './EditProperty';

const ListOnly = ({ search }) => {
    return (
        <>
            <div className='col-lg-3 col-12 h-100 overflow-scroll'>
                <PropertiesList search={search} />
            </div>
        </>
    );
};

const ListWithDetails = ({ search }) => {
    return (
        <>
            <div className='col-3 d-none d-lg-block h-100 overflow-scroll'>
                <PropertiesList search={search} />
            </div>
            <div className='col-12 col-lg-9'>
                <Routes>
                    <Route path='add-person' element={<AddProperty />} />
                    <Route path=':personId' element={<PropertyDetail />} />
                    <Route path=':personId/edit' element={<EditProperty />} />
                </Routes>
            </div>
        </>
    );
};

const Properties = ({ rootPath }) => {
    const [search, setSearchQuery] = useState('');

    return (
        <section className='container-fluid data-view h-100 overflow-hidden'>
            <PropertiesHeader search={search} setSearchQuery={setSearchQuery} />
            <div className='card'>
                <div className='row h-100 overflow-hidden'>
                    <Routes>
                        <Route index element={<ListOnly search={search} />} />
                        <Route
                            path='*'
                            element={<ListWithDetails search={search} />}
                        />
                    </Routes>
                </div>
            </div>
        </section>
    );
};

export default Properties;
