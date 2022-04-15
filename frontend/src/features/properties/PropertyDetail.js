import React from 'react';

import { DetailsView } from 'components/crudapp';

const PropertyDetail = ({ data: property, isLoading, ...rest }) => {
    const { Body, Header, Field } = DetailsView;
    return (
        <DetailsView>
            <Body>
                <Field value={property?.acres} label='Acres' />
                <Field value={property?.postalcode} label='Zipcode' />
            </Body>
            <Header>
                {property?.address1} {property?.address2}
            </Header>
        </DetailsView>
    );
};

export default PropertyDetail;
