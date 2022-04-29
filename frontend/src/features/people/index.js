import './people.scss';
import { useState } from 'react';

import { Route, Routes, useResolvedPath } from 'react-router-dom';

import CrudApp, {
    ListOfRecords,
    RecordDetail,
    Header,
    RecordForm,
    AddRecord,
    EditRecord,
} from 'components/crudapp';

import {
    useGetPeopleQuery,
    useGetPersonQuery,
    useAddPersonMutation,
    useEditPersonMutation,
} from './api';

import PeopleList from './PeopleList';
import PersonDetail from './PersonDetail';
import PersonForm from './PersonForm';

const People = () => {
    const path = useResolvedPath('./');
    return (
        <CrudApp
            to={path.pathname}
            useGetRecordsQuery={useGetPeopleQuery}
            useGetRecordQuery={useGetPersonQuery}
            useAddRecordMutation={useAddPersonMutation}
            useEditRecordMutation={useEditPersonMutation}
        >
            <Header
                title='People'
                addButtonText='Add Person'
                searchPlaceholder='Search people'
            />
            <ListOfRecords>
                {(query) => <PeopleList {...query} />}
            </ListOfRecords>
            <RecordDetail>
                {(query) => <PersonDetail {...query} />}
            </RecordDetail>
            <AddRecord title='Add Person' />
            <EditRecord
                title={(record) =>
                    `Update ${record.first_name} ${record.last_name}`
                }
            ></EditRecord>
            <RecordForm
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    mobile: '',
                }}
            >
                <PersonForm />
            </RecordForm>
        </CrudApp>
    );
};

export default People;
