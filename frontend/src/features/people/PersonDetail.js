import React from 'react';

import { Col, Row, ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { DetailsView, FieldContainer, Field } from 'components/crudapp';
import Card from 'components/layout/Cards';

const DetailsCard = ({ person }) => {
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

const PropertiesCard = ({ properties }) => {
    const results = (
        <ListGroup as='ul' variant='flush'>
            {properties?.map(({ id, address1, acres, ...rest }) => (
                <ListGroup.Item as='li' className='nav-item' key={id}>
                    <NavLink to={`/properties/${id}`} className='lh-sm'>
                        <h5>{address1}</h5>
                        <span className='text-muted'>{acres} acres</span>
                    </NavLink>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );

    return <Card header={<h4>Properties</h4>} body={results} />;
};

const BillingCard = ({ billing }) => {
    return (
        <Card
            header={<h4>Billing</h4>}
            body={<>This is the billing section new</>}
        />
    );
};

const PersonDetail = ({ data: person, isLoading }) => {
    return (
        <Row xs={1} lg={2} className='g-4' as='article'>
            <Col>
                <DetailsCard person={person} />
            </Col>
            <Col>
                <PropertiesCard properties={person?.properties_set} />
            </Col>
            <Col>
                <BillingCard />
            </Col>
        </Row>
    );
};

export default PersonDetail;
