import './properties.scss';
import React from 'react';

import PropTypes from 'prop-types';

import CrudApp, {
    ListOfRecords,
    RecordDetail,
    Header,
    AddRecordView,
} from 'components/crudapp';

import {
    useGetPropertiesQuery,
    useGetPropertyQuery,
    useAddPropertyMutation,
} from './api';
import PropertyDetail from './PropertyDetail';
import AddProperty from './AddProperty';
import EditProperty from './EditProperty';
import PropertiesList from './PropertiesList';

const Properties = () => {
    return (
        <CrudApp
            useGetListQuery={useGetPropertiesQuery}
            useGetRecordQuery={useGetPropertyQuery}
            useAddRecordMutation={useAddPropertyMutation}
        >
            <Header
                title='Properties'
                addButtonText='Add Property'
                searchPlaceholder='Search properties...'
            />
            <ListOfRecords>
                {(query) => <PropertiesList {...query} />}
            </ListOfRecords>

            <RecordDetail>
                {(query) => <PropertyDetail {...query} />}
            </RecordDetail>
        </CrudApp>
    );
};

export default Properties;
