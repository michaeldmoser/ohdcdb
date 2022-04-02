import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useGetPeopleQuery } from './api';

const ListItem = ({ name, additionalInfo }) => {
    return (
        <>
            <h5>{name}</h5>
            <span className='text-muted'>{additionalInfo}</span>
        </>
    );
};

/**
 * Renders a list of records. {children} should be a render function that renders an individual list item
 *
 * @param {array} records A list of the records to render in the list results. It is expectedd that each item in the array is an object with an `id` attribute
 * @param {function} children renderer for the individual list items.
 * @returns JSX
 */
const ListResults = ({ records, children }) => {
    return (
        <ListGroup as='ul' variant='flush'>
            {records.map(({ id, ...rest }) => (
                <ListGroup.Item as='li' className='nav-item' key={id}>
                    <NavLink to={`${id}`} className='lh-sm'>
                        {children({ id, ...rest })}
                    </NavLink>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

ListResults.propTypes = {
    children: PropTypes.func.isRequired,
    records: PropTypes.array.isRequired,
};

const ListView = ({ listName, records, children }) => {
    return (
        <article className='list-view'>
            <header className='visually-hidden'>
                <h4>{listName || 'List of records'}</h4>
            </header>
            <ListResults records={records}>
                {(record) => children(record)}
            </ListResults>
        </article>
    );
};

ListView.propTypes = {
    listName: PropTypes.string,
    records: PropTypes.array.isRequired,
    children: PropTypes.func.isRequired,
};

const PeopleList = ({ className, showDetailFor, query = '' }) => {
    const { data: people, isLoading } = useGetPeopleQuery(query);

    if (isLoading) return <div>Loading</div>;

    if (!people) return <div>No people</div>;

    return (
        <ListView listName='List of people' records={people}>
            {({ first_name, last_name, email }) => (
                <ListItem
                    name={`${first_name} ${last_name}`}
                    additionalInfo={email}
                />
            )}
        </ListView>
    );
};

export default PeopleList;
