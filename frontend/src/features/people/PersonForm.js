import { useState } from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';

export default function PersonForm({
    data = { first_name: '', last_name: '', mobile: '', email: '' },
    handleSubmit,
}) {
    const [first_name, setFirstName] = useState(data.first_name);
    const [last_name, setLastName] = useState(data.last_name);
    const [mobile, setMobile] = useState(data.mobile);
    const [email, setEmail] = useState(data.email);

    const [validated, setValidated] = useState(false);

    const onSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        const validity = form.checkValidity();
        setValidated(true);
        if (validity === false) {
            return;
        }

        handleSubmit({ first_name, last_name, email, mobile });
    };

    return (
        <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Row>
                <FloatingLabel
                    as={Col}
                    className='mb-3'
                    controlId='first_name'
                    label='First Name'
                >
                    <Form.Control
                        type='text'
                        placeholder='First Name'
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        value={first_name}
                    />
                    <Form.Control.Feedback type='invalid' tooltip>
                        First name is required
                    </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                    as={Col}
                    className='mb-3'
                    controlId='last_name'
                    label='Last Name'
                >
                    <Form.Control
                        type='text'
                        placeholder='Last Name'
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        value={last_name}
                    />
                    <Form.Control.Feedback type='invalid' tooltip>
                        Last name is required
                    </Form.Control.Feedback>
                </FloatingLabel>
            </Row>
            <FloatingLabel
                className='mb-3'
                controlId='mobile'
                label='Mobile phone'
            >
                <Form.Control
                    type='tel'
                    placeholder='Mobile phone'
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                />
            </FloatingLabel>
            <FloatingLabel
                className='mb-3'
                controlId='email'
                label='Email address'
            >
                <Form.Control
                    type='email'
                    placeholder='Email address'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </FloatingLabel>
            <Button variant='primary' type='submit'>
                Save
            </Button>
        </Form>
    );
}
