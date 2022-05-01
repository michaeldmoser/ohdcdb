import { GenericInput, TextInput } from 'components/forms';
import React from 'react';
import { Row } from 'react-bootstrap';

export default function PropertyForm() {
    return (
        <>
            <Row>
                <TextInput name='address1' label='Address 1' />
                <TextInput name='address2' label='Address 2' />
            </Row>
            <GenericInput
                type='number'
                placeholder={59801}
                min='59801'
                max='59810'
                name='postalcode'
                label='Zip code'
            />
            <GenericInput
                type='number'
                placeholder='1.0'
                step='0.01'
                min='0.01'
                max='10'
                name='acres'
                label='Acres'
            />
        </>
    );
}
