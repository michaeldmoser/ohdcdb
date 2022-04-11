import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const ActionsMenu = () => {
    return (
        <nav className='ms-auto'>
            <Nav as='ul'>
                <Nav.Item as='li'>
                    <NavLink
                        to='edit'
                        className='btn btn-primary'
                        role='button'
                    >
                        Edit
                    </NavLink>
                </Nav.Item>
            </Nav>
        </nav>
    );
};

export const Header = ({ children, ...props }) => {
    return <h4>{children}</h4>;
};

export const Body = ({ children, ...props }) => {
    return (
        <div className='card-body'>
            <dl className='row'>{children}</dl>
        </div>
    );
};

export const Field = ({ label, value, ...props }) => {
    return (
        <>
            <dt className='col-sm-3'>{label}</dt>
            <dd className='col-sm-9'>{value}</dd>
        </>
    );
};

const DetailsView = ({ data, isLoading, ...props }) => {
    if (isLoading) return <h4>Loading...</h4>;

    if (!data) return <div>Not found</div>;

    const children = React.Children.toArray(props.children);
    const header = children.find(({ type }) => type === Header);
    const body = children.find(({ type }) => type === Body);

    return (
        <article className='detail-view'>
            <header className='d-flex'>
                {header}
                <ActionsMenu />
            </header>
            {body}
        </article>
    );
};

export default DetailsView;
