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
    useGetOrganizationsQuery,
    useGetOrganizationQuery,
    useAddOrganizationMutation,
    useEditOrganizationMutation,
} from './api';
import OrganizationDetail from './OrganizationDetail';
import OrganizationsList from './OrganizationsList';
import OrganizationForm from './OrganizationForm';

const Organizations = () => {
    const path = useResolvedPath('./');
    return (
        <CrudApp
            to={path.pathname}
            useGetRecordsQuery={useGetOrganizationsQuery}
            useGetRecordQuery={useGetOrganizationQuery}
            useAddRecordMutation={useAddOrganizationMutation}
            useEditRecordMutation={useEditOrganizationMutation}
        >
            <Header
                title='Organizations'
                addButtonText='Add Organization'
                searchPlaceholder='Search organizations...'
            />
            <ListOfRecords>
                {(query) => <OrganizationsList {...query} />}
            </ListOfRecords>

            <RecordDetail>
                {(query) => <OrganizationDetail {...query} />}
            </RecordDetail>

            <AddRecord title='Add Organization' />
            <EditRecord
                title={(record) => `Update ${record.name}`}
            ></EditRecord>
            <RecordForm
                initialValues={{
                    name: '',
                    contact_name: '',
                    contact_email: '',
                    contact_phone: '',
                }}
            >
                <OrganizationForm />
            </RecordForm>
        </CrudApp>
    );
};

export default Organizations;
