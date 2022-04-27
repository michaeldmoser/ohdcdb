import React from 'react';
import {
    render,
    screen,
    getByText,
    getByRole,
    userEvent,
} from 'testing/library';

import { Formik } from 'formik';

import { GenericInput } from '../index';

it('should render a text input formik field', () => {
    const input = render(
        <Formik initialValues={{ title: '' }}>
            <form>
                <GenericInput name='title' label='Title' type='text' />
            </form>
        </Formik>
    );

    expect(input).toMatchSnapshot();
});

it('should render with a custom placeholder', () => {
    const input = render(
        <Formik initialValues={{ title: '' }}>
            <form>
                <GenericInput
                    name='title'
                    label='Title'
                    type='text'
                    placeholder='Enter a title'
                />
            </form>
        </Formik>
    );

    expect(input).toMatchSnapshot();
});

it('should render with a value set', () => {
    const input = render(
        <Formik initialValues={{ title: 'Testing' }}>
            <form>
                <GenericInput
                    name='title'
                    label='Title'
                    type='text'
                    placeholder='Enter a title'
                />
            </form>
        </Formik>
    );

    expect(input).toMatchSnapshot();
});

it('should set a default label', () => {
    const input = render(
        <Formik initialValues={{ title: '' }}>
            <form>
                <GenericInput name='title' type='text' />
            </form>
        </Formik>
    );

    expect(input).toMatchSnapshot();
});
