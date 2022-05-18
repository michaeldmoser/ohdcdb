import React from 'react';

import { render } from 'testing/library';

import { RelatedField, FieldContainer, Field } from '../Fields';

describe('RelatedField', () => {
    const relations = [
        {
            id: 1,
            id2: 3,
            id3: 5,
            title: 'Title 1',
            description: 'Description 1',
        },
        {
            id: 2,
            id2: 4,
            id3: 6,
            title: 'Title 2',
            description: 'Description 2',
        },
    ];

    const child = ({ title, description }) => (
        <>
            {title} {description}
        </>
    );

    it('should render using default id value', () => {
        const rendered = render(
            <RelatedField value={relations} label='Related'>
                {child}
            </RelatedField>
        );

        expect(rendered).toMatchSnapshot();
    });

    it('should render using string id', () => {
        const rendered = render(
            <RelatedField value={relations} label='Related' idField='id2'>
                {child}
            </RelatedField>
        );

        expect(rendered).toMatchSnapshot();
    });

    it('should render with idField as a function', () => {
        const rendered = render(
            <RelatedField
                value={relations}
                label='Related'
                idField={({ id3 }) => id3}
            >
                {child}
            </RelatedField>
        );

        expect(rendered).toMatchSnapshot();
    });

    it('should render with href as a string', () => {
        const rendered = render(
            <RelatedField value={relations} label='Related' href='/items'>
                {child}
            </RelatedField>
        );

        expect(rendered).toMatchSnapshot();
    });

    it('should render with href as a function', () => {
        const rendered = render(
            <RelatedField
                value={relations}
                label='Related'
                href={({ id2 }) => `/items/${id2}`}
            >
                {child}
            </RelatedField>
        );

        expect(rendered).toMatchSnapshot();
    });
});

describe('Fields and field', () => {
    it('should render a basic field label and value', () => {
        const rendered = render(
            <FieldContainer>
                <Field value={1} label='Field label' />
            </FieldContainer>
        );

        expect(rendered).toMatchSnapshot();
    });
});
