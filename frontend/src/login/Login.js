import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const Login = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        // const form = event.currentTarget;
        // event.preventDefault();
        // if (form.checkValidity() === false) event.stopPropagation();
        // setValidated(true);
    };

    return (
        <>
            <main>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={5}>
                            <Card className='border-0 rounded-lg mt-5'>
                                <Card.Header>
                                    Orchard Homes Ditch Database
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Login</Card.Title>
                                    <Form
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleSubmit}
                                    >
                                        <Form.Group
                                            className='mb-3'
                                            controlId='inputEmail'
                                        >
                                            <Form.Label>
                                                Email address
                                            </Form.Label>
                                            <Form.Control
                                                type='email'
                                                placeholder='name@example.com'
                                                name='email'
                                                required
                                            />
                                            <Form.Control.Feedback>
                                                Looks good!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                Please provide an email address
                                                to login.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group
                                            className='mb-3'
                                            controlId='inputPassword'
                                        >
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type='password'
                                                placeholder='Password'
                                                name='current-password'
                                                required
                                            />
                                            <Form.Control.Feedback>
                                                Looks good!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                Please provide a password to
                                                login.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <div className='d-flex align-items-center justify-content-between mt-4 mb-0'>
                                            <a
                                                className='small'
                                                href='password.html'
                                            >
                                                Forgot Password?
                                            </a>
                                            <Button
                                                variant='primary'
                                                type='submit'
                                            >
                                                Login
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                                <Card.Footer className='text-center py-3'></Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
            <footer className='py-4 bg-light mt-auto'>
                <div className='container-fluid px-4'>
                    <div className='d-flex align-items-center justify-content-between small'>
                        <div className='text-muted'>
                            Copyright &copy; ZooTown Apps 2022
                        </div>
                        <div>
                            <a href='#'>Privacy Policy</a>
                            &middot;
                            <a href='#'>Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
