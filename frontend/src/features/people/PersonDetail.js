import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPersonQuery } from './api';

import DetailsView, {
    Body,
    Field,
    Header,
} from 'components/crudapp/detailsview';

const PersonDetail = () => {
    const { personId } = useParams();
    const { data: person, isLoading } = useGetPersonQuery(personId);

    return (
        <DetailsView data={person} isLoading={isLoading}>
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
