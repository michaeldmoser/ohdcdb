import { useState } from 'react';
import {
    Button,
    Form,
    FloatingLabel,
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PeopleHeader = ({ query, setSearchQuery }) => {
    const navigate = useNavigate();
    const navigateToAddPersonForm = () => {
        navigate('/people/add-person');
    };

    return (
        <Container as='header' fluid className='mb-3'>
            <Row>
                <Col as='h3' sm={2}>
                    People
                </Col>
                <Col sm={8}>
                    <Form.Control
                        type='search'
                        name='search'
                        placeholder='Search people'
                        required
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={query}
                    />
                </Col>
                <Col sm={2} className='d-flex align-items-center'>
                    <Button
                        className='ms-auto'
                        size='sm'
                        onClick={navigateToAddPersonForm}
                    >
                        Add Person
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default PeopleHeader;
