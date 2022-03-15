import { useParams } from 'react-router-dom';
import { useGetPersonQuery } from './api';

const PeopleDetail = () => {
    const { personId } = useParams();
    const { data: person, isLoading } = useGetPersonQuery(personId);

    if (isLoading) return <h4>Loading...</h4>;

    if (!person) return <div>Not found</div>;

    return (
        <article className='detail-view'>
            <header>
                <h4>
                    {person.first_name} {person.last_name}
                </h4>
            </header>
            <dl className='row'>
                <dt className='col-sm-3'>Mobile Phone</dt>
                <dd className='col-sm-9'>{person.mobile}</dd>
                <dt className='col-sm-3'>Home Phone</dt>
                <dd className='col-sm-9'>{person.home}</dd>
                <dt className='col-sm-3'>Email</dt>
                <dd className='col-sm-9'>{person.email}</dd>
            </dl>
        </article>
    );
};

export default PeopleDetail;
