import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Context from './context';

const ActionsMenu = () => {
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

const Header = ({ children, ...props }) => {
    return <h4>{children}</h4>;
};

const Body = ({ children, ...props }) => {
    return <div className='card-body'>{children}</div>;
};

export const DetailsView = ({ children }) => {
    const {
        detailQuery: { data, isLoading },
    } = useContext(Context);
    if (isLoading) return <h4>Loading...</h4>;

    if (!data) return <div>Not found</div>;

    const kids = React.Children.toArray(children);
    const header = kids.find(({ type }) => type === Header);
    const body = kids.find(({ type }) => type === Body);

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

Object.assign(DetailsView, {
    Header,
    Body,
    ActionsMenu,
});
export default DetailsView;
