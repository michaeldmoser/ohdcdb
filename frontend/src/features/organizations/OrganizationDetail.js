import React from 'react';
import PropTypes from 'prop-types';

import { DetailsView, Field, FieldContainer } from 'components/crudapp';

const OrganizationDetail = ({ data: organization, isLoading, ...rest }) => {
    const { Body, Header } = DetailsView;
    return (
        <DetailsView>
            <Body>
                <FieldContainer>
                    <Field
                        value={organization?.contact_name}
                        label='Contact Name'
                    />
                    <Field
                        value={organization?.contact_phone}
                        label='Contact Phone'
                    />
                    <Field
                        value={organization?.contact_email}
                        label='Contact Email'
                    />
                </FieldContainer>
            </Body>
            <Header>{organization?.name}</Header>
        </DetailsView>
    );
};

export default OrganizationDetail;
