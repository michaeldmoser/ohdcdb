import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAddPersonMutation } from './api';

const AddPerson = () => {
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [mobile, setMobile] = useState();
    const [email, setEmail] = useState();
    const [addPerson] = useAddPersonMutation();
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        const validity = form.checkValidity();
        setValidated(true);
        if (validity === false) {
            return;
        }

        try {
            const person = await addPerson({
                first_name,
                last_name,
                mobile,
                email,
            }).unwrap();

            navigate(`/people/${person.id}`);
        } catch (err) {
            toast.error(err.data.detail);
        }
    };

    return (
        <article className='add-view'>
            <header>
                <h4>Add Person</h4>
            </header>
            <div className='card-body'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                        />
                    </FloatingLabel>
                    <Button variant='primary' type='submit'>
                        Save
                    </Button>
                </Form>
            </div>
        </article>
    );
};

export default AddPerson;
