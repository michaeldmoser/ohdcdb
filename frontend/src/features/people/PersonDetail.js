import React from 'react';

import { DetailsView, Body, Field, Header } from 'components/crudapp';

const PersonDetail = ({ data: person, isLoading }) => {
    return (
        <DetailsView>
            <Body>
                <Field value={person?.mobile} label='Mobile phone' />
                <Field value={person?.email} label='Email' />
            </Body>
            <Header>
                {person?.first_name} {person?.last_name}
            </Header>
        </DetailsView>
    );
};

export default PersonDetail;
