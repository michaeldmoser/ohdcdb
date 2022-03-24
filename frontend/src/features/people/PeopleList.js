import { Button, Dropdown, ListGroup, Table } from 'react-bootstrap';
import { ThreeDots, Eye } from 'react-bootstrap-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useGetPeopleQuery } from './api';

const PeopleList = ({ className, showDetailFor }) => {
    const { data: people, isLoading, isFetching } = useGetPeopleQuery();
    const navigate = useNavigate();

    if (isLoading || isFetching) return <div>Loading</div>;

    if (!people) return <div>No people</div>;

    return (
        <article className='list-view'>
            <header className='card-header'>
                <h4>People</h4>
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
