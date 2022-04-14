import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPropertyQuery } from './api';

import DetailsView, {
    Body,
    Field,
    Header,
} from 'components/crudapp/DetailsView';

const PropertyDetail = ({ data: property, isLoading, ...rest }) => {
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
