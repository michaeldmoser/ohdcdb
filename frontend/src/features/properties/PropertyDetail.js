import React from 'react';
import PropTypes from 'prop-types';

import {
    DetailsView,
    Field,
    RelatedField,
    FieldContainer,
} from 'components/crudapp';

function OwnersField(props) {
    return (
        <RelatedField href='/people' {...props}>
            {({ first_name, last_name }) => (
                <>
                    {first_name} {last_name}
                </>
            )}
        </RelatedField>
    );
}

OwnersField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
};

const PropertyDetail = ({ data: property, isLoading, ...rest }) => {
    const { Body, Header } = DetailsView;
    return (
        <DetailsView>
            <Body>
                <FieldContainer>
                    <Field value={property?.acres} label='Acres' />
                    <Field value={property?.postalcode} label='Zipcode' />
                    <OwnersField
                        value={property?.owners ?? []}
                        label='Owners'
                    />
                </FieldContainer>
            </Body>
            <Header>
                {property?.address1} {property?.address2}
            </Header>
        </DetailsView>
    );
};

export default PropertyDetail;
