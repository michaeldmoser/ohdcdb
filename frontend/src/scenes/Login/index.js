import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { login } from 'features/User/authSlice';

const Login = () => {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) event.stopPropagation();
        dispatch(login({ username, password }));
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
                                            controlId='inputUsername'
                                        >
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type='email'
                                                placeholder='Enter your username'
                                                name='username'
                                                required
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                            />
                                            <Form.Control.Feedback>
                                                Looks good!
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback type='invalid'>
                                                Please provide a username to
                                                login.
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
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
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

export default Login;
