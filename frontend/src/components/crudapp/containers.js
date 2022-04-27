import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import Context from './context';

export const RecordDetail = ({ children }) => {
    const { detailQuery } = useContext(Context);

    return children(detailQuery);
};

RecordDetail.propTypes = {
    children: PropTypes.func.isRequired,
};

export const ListOfRecords = ({ children }) => {
    const context = useContext(Context);
    const { recordsList, recordsAreLoading } = context;

    return children({ data: recordsList, isLoading: recordsAreLoading });
};

export const RecordWithSearchResults = ({ listview, children }) => {
    return (
        <>
            <div className='col-3 d-none d-lg-block h-100 overflow-scroll'>
                {listview}
            </div>
            <div className='col-12 col-lg-9'>
                <Outlet />
            </div>
        </>
    );
};
