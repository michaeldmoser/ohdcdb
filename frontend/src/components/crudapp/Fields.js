import { NavLink } from 'react-router-dom';
import PropTypes from 'utils/PropTypes';
import _ from 'lodash';

/**
 * Display a field on the detailview
 *
 * @param {string} props.label - The user visible name of the field
 * @param {*} props.value - The value to be rendered for the field
 * @returns
 */
export const Field = ({ label, value, ...props }) => {
    return (
        <>
            <dt className='col-sm-3' aria-label={label}>
                {label}
            </dt>
            <dd className='col-sm-9' aria-label={value}>
                {value}
            </dd>
        </>
    );
};
Field.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
};

/**
 * Renders a container for Fields on a detail view
 *
 * @param {array} props.children - An array of Field components
 */
export const FieldContainer = ({ children, ...props }) => {
    return <dl className='row'>{children}</dl>;
};

FieldContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.isComponent(Field)),
        PropTypes.isComponent(Field),
    ]),
};

/**
 * Renders as a basic field but lists items as links to other records in the database.
 *
 * @param {string|function} [props.idField=id] - Can be a string that is the key lookup or a function that returns the value to use as a unique key.
 * @param {string|function} [props.href] - Can be a string that is the key lookup of the unique identifier to use for each related item or a function that returns the value for the href property of the link.
 * @param {string} label - The user visible name of the field
 * @param {Object[]} value - An array of objects to be rendered in a list
 * @param {function} children - Function to render the value of each related item.
 *
 * @example
 * // <RelatedField label='Owners' value=[{id: 1, first_name: 'John', last_name: 'Doe'}, {id: 2, first_name: 'Jane', last_name: 'Doe'}] idField='id'>
 * // ((item) => <>{item.first_name} {item.last_name}</>)
 * // </RelatedField>
 *
 * @example
 * // <RelatedField label='Owners' value=[{id: 1, first_name: 'John'}...] idField=((item) => item.id)>
 * // ((item) => <>{item.first_name} {item.last_name}</>)
 * // </RelatedField>
 *
 * @example
 * // <RelatedField label='Owners' value=[{id: 1, first_name: 'John'}...] href=((item) => `/items/${item.id})`>
 * // ((item) => <>{item.first_name} {item.last_name}</>)
 * // </RelatedField>
 *
 * @example
 * // <RelatedField label='Owners' value=[{id: 1, first_name: 'John'}...] href='id'>
 * // ((item) => <>{item.first_name} {item.last_name}</>)
 * // </RelatedField>
 */
export const RelatedField = ({
    value,
    idField = 'id',
    href,
    children,
    ...props
}) => {
    return (
        <Field
            value={
                <ul className='list-unstyled'>
                    {value.map((related) => {
                        const key = _.isString(idField)
                            ? related[idField]
                            : _.isFunction(idField)
                            ? idField(related)
                            : related?.id;

                        const link = _.isFunction(href)
                            ? href(related)
                            : _.isEmpty(href)
                            ? key
                            : `${href}/${key}`;

                        return (
                            <li key={key}>
                                <NavLink to={`${link}`} className='lh-sm'>
                                    {children(related)}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            }
            {...props}
        />
    );
};

RelatedField.propTypes = {
    href: PropTypes.oneOfType([
        PropTypes.func.isRequired,
        PropTypes.string.isRequired,
    ]),
    idField: PropTypes.oneOfType([
        PropTypes.func.isRequired,
        PropTypes.string.isRequired,
    ]),
    label: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
    children: PropTypes.func.isRequired,
};
