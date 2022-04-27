import React from 'react';
import { render } from 'testing/library';

import { Formik } from 'formik';

import { TextInput } from '../index';

it('should render as a text input field', () => {
    const input = render(
        <Formik initialValues={{ title: '' }}>
            <form>
                <TextInput
                    name='title'
                    label='Title'
                    placeholder='Enter a title'
                />
            </form>
        </Formik>
    );

    expect(input).toMatchSnapshot();
});

it('should not allow the type to be overridden', () => {
    const input = render(
        <Formik initialValues={{ title: '' }}>
            <form>
                <TextInput
                    name='title'
                    label='Title'
                    placeholder='Enter a title'
                    type='email'
                />
            </form>
        </Formik>
    );

    expect(input).toMatchSnapshot();
});
