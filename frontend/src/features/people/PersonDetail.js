import React from 'react';

import { Col, Row, ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

import { DetailsView, FieldContainer, Field } from 'components/crudapp';
import Card from 'components/layout/Cards';

const DetailsCard = ({ person }) => {
    const { Body, Header } = DetailsView;
    return (
        <DetailsView className='h-100'>
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

const PropertiesList = ({ properties }) => (
    <ListGroup as='ul' variant='flush'>
        {properties?.map(({ id, address1, acres, ...rest }) => (
            <ListGroup.Item as='li' className='nav-item container' key={id}>
                <Row>
                    <Col>
                        <NavLink to={`/properties/${id}`} className='lh-sm'>
                            <h5>{address1}</h5>
                        </NavLink>
                        <span className='text-muted'>{acres} acres</span>
                    </Col>
                    <Col xs={2}>
                        <a
                            className='fs-3'
                            href={
                                'https://www.google.com/maps/place/' +
                                address1.replace(/ /g, '+') +
                                ',Missoula,MT'
                            }
                            title={`Location of ${address1}`}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <FontAwesomeIcon icon={faMapLocationDot} />
                        </a>
                    </Col>
                </Row>
            </ListGroup.Item>
        ))}
    </ListGroup>
);

const PropertiesCard = (props) => {
    return (
        <Card
            header={<h4>Properties</h4>}
            body={<PropertiesList {...props} />}
            fullHeight={true}
        />
    );
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
        <Row xs={1} lg={2} className='g-4 equal' as='article'>
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
