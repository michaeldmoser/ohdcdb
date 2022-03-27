import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAddPersonMutation } from './api';
import PersonForm from './PersonForm';

const AddPerson = () => {
    const [addPerson] = useAddPersonMutation();
    const navigate = useNavigate();

    const handleSubmit = async ({ first_name, last_name, email, mobile }) => {
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
                <PersonForm handleSubmit={handleSubmit} />
            </div>
        </article>
    );
};

export default AddPerson;
