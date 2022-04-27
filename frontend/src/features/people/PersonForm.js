import { GenericInput, TextInput } from 'components/forms';
import React from 'react';
import { Row } from 'react-bootstrap';

export default function PersonForm() {
    return (
        <>
            <Row>
                <TextInput name='first_name' label='First Name' />
                <TextInput name='last_name' label='Last Name' />
            </Row>
            <GenericInput type='tel' name='mobile' label='Mobile phone' />
            <GenericInput type='email' name='email' label='Email address' />
        </>
    );
}
