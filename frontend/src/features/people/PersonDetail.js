import React from 'react';

import { DetailsView, FieldContainer, Field } from 'components/crudapp';

const PersonDetail = ({ data: person, isLoading }) => {
    const { Body, Header } = DetailsView;

    return (
        <DetailsView>
            <Body>
                <FieldContainer>
                    <Field value={person?.mobile} label='Mobile phone' />
                    <Field value={person?.email} label='Email' />
                </FieldContainer>
            </Body>
            <Header>
                {person?.first_name} {person?.last_name}
            </Header>
        </DetailsView>
    );
};

export default PersonDetail;
