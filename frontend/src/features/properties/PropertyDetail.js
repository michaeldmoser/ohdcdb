import React from 'react';
import PropTypes from 'prop-types';

import { DetailsView, RelatedField } from 'components/crudapp';

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
    const { Body, Header, Field } = DetailsView;
    return (
        <DetailsView>
            <Body>
                <Field value={property?.acres} label='Acres' />
                <Field value={property?.postalcode} label='Zipcode' />
                <OwnersField value={property?.owners ?? []} label='Owners' />
            </Body>
            <Header>
                {property?.address1} {property?.address2}
            </Header>
        </DetailsView>
    );
};

export default PropertyDetail;
