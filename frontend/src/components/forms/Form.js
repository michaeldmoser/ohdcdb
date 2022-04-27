import React from 'react';
import { Formik } from 'formik';
import { Form as BootstrapForm } from 'react-bootstrap';

export function Form({ children, ...rest }) {
    return (
        <Formik {...rest}>
            {(formik) => {
                return (
                    <BootstrapForm noValidate onSubmit={formik.handleSubmit}>
                        {children(formik)}
                    </BootstrapForm>
                );
            }}
        </Formik>
    );
}
