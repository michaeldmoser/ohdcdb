import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useGetPeopleQuery } from './api';

const PeopleList = ({ className, showDetailFor, query = '' }) => {
    const { data: people, isLoading } = useGetPeopleQuery(query);

    if (isLoading) return <div>Loading</div>;

    if (!people) return <div>No people</div>;

    return (
        <article className='list-view'>
            <header className='visually-hidden'>
                <h4>List of People</h4>
            </header>
            <ListGroup as='ul' variant='flush'>
                {people.map(({ id, first_name, last_name, email }) => (
                    <ListGroup.Item as='li' className='nav-item' key={id}>
                        <NavLink to={`${id}`} className='lh-sm'>
                            <h5>
                                {first_name} {last_name}
                            </h5>
                            <span className='text-muted'>{email}</span>
                        </NavLink>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </article>
    );
};

export default PeopleList;
