import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Context from './context';

const Item = ({ name, additionalInfo }) => {
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

const NoResults = () => {
    return <p>No matching records could be found.</p>;
};

const LoadingResults = () => {
    return <p>Loading results...</p>;
};

const Article = ({ listName, children, ...rest }) => {
    return (
        <article className='list-view'>
            <header className='visually-hidden'>
                <h4>{listName || 'List of records'}</h4>
            </header>
            {children}
        </article>
    );
};

/**
 * Basic list view component
 *
 * @param {string} listName The name of the list
 * @param query  The result of an rtk-query useGet.*Query() hook
 * @param children A function which will be passed individual records and should return the rendered record.
 */
export const ListView = ({ listName, children, ...rest }) => {
    const {
        listQuery: { data: records, isLoading },
    } = useContext(Context);

    return (
        <Article listName={listName} {...rest}>
            {isLoading ? (
                <LoadingResults />
            ) : !records ? (
                <NoResults />
            ) : (
                <ListResults records={records}>
                    {(record) => children(record)}
                </ListResults>
            )}
        </Article>
    );
};

ListView.propTypes = {
    listName: PropTypes.string,
    children: PropTypes.func.isRequired,
};
Object.assign(ListView, {
    Item,
});

export default ListView;
