import { useContext } from 'react';
import { useNavigate, useResolvedPath } from 'react-router-dom';

import _ from 'lodash';

import { Form, SubmitButton } from 'components/forms';

import CrudAppContext from './context';

export const AddRecord = ({ title = 'Add Record', children }) => {
    const { recordform } = useContext(CrudAppContext);
    return (
        <article className='add-view'>
            <header>
                <h4>{title}</h4>
            </header>
            <div className='card-body'>{recordform}</div>
        </article>
    );
};

export const EditRecord = ({ title = 'Edit Record', children }) => {
    const { recordform, detailQuery } = useContext(CrudAppContext);

    if (detailQuery.isLoading) return <div>Loading ...</div>;

    return (
        <article className='add-view'>
            <header>
                <h4>{_.isFunction(title) ? title(detailQuery.data) : title}</h4>
            </header>
            <div className='card-body'>{recordform}</div>
        </article>
    );
};

export const RecordForm = ({ children, initialValues, ...rest }) => {
    const { addRecord, editRecord, detailQuery } = useContext(CrudAppContext);
    const navigate = useNavigate();

    const prepopulateFormValues = Object.assign(
        {},
        initialValues,
        detailQuery.data ?? {}
    );

    return (
        <Form
            initialValues={prepopulateFormValues}
            onSubmit={async (values) => {
                const mutate = detailQuery.data?.id ? editRecord : addRecord;
                const data = { id: detailQuery.data?.id, ...values };
                const record = await mutate(data).unwrap();
                navigate(`../${record.id}`);
            }}
            {...rest}
        >
            {(formik) => {
                return (
                    <>
                        {children}
                        <SubmitButton>Save</SubmitButton>
                    </>
                );
            }}
        </Form>
    );
};

export default RecordForm;
