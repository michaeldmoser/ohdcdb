import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useEditPersonMutation, useGetPersonQuery } from './api';
import PersonForm from './PersonForm';

function EditPerson() {
    const { personId } = useParams();
    const { data: person, isLoading } = useGetPersonQuery(personId);

    const [editPerson] = useEditPersonMutation();
    const navigate = useNavigate();

    const handleSubmit = async ({ first_name, last_name, mobile, email }) => {
        try {
            const person = await editPerson({
                id: personId,
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

    if (isLoading) return <div>Loading</div>;

    return (
        <article className='add-view'>
            <header>
                <h4>
                    Update {person.first_name} {person.last_name}
                </h4>
            </header>
            <div className='card-body'>
                <PersonForm handleSubmit={handleSubmit} data={person} />
            </div>
        </article>
    );
}

export default EditPerson;
