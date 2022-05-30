import { GenericInput, TextInput } from 'components/forms';
import React from 'react';

export default function OrganizationForm() {
    return (
        <>
            <TextInput name='name' label='Name' />
            <TextInput name='contact_name' label='Contact Name' />
            <GenericInput
                type='tel'
                name='contact_phone'
                label='Contact phone'
            />
            <GenericInput
                type='email'
                name='contact_email'
                label='Email address'
            />
        </>
    );
}
