import './properties.scss';
import React from 'react';
import { useResolvedPath } from 'react-router-dom';

import CrudApp, {
    ListOfRecords,
    RecordDetail,
    Header,
    RecordForm,
    AddRecord,
    EditRecord,
} from 'components/crudapp';

import {
    useGetPropertiesQuery,
    useGetPropertyQuery,
    useAddPropertyMutation,
    useEditPropertyMutation,
} from './api';
import PropertyDetail from './PropertyDetail';
import PropertiesList from './PropertiesList';
import PropertyForm from './PropertyForm';

const Properties = () => {
    const path = useResolvedPath('./');
    return (
        <CrudApp
            to={path.pathname}
            useGetRecordsQuery={useGetPropertiesQuery}
            useGetRecordQuery={useGetPropertyQuery}
            useAddRecordMutation={useAddPropertyMutation}
            useEditRecordMutation={useEditPropertyMutation}
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

            <AddRecord title='Add Property' />
            <EditRecord
                title={(record) => `Update ${record.address1}`}
            ></EditRecord>
            <RecordForm
                initialValues={{
                    address1: '',
                    address2: '',
                    acres: '',
                    postalcode: '',
                }}
            >
                <PropertyForm />
            </RecordForm>
        </CrudApp>
    );
};

export default Properties;
