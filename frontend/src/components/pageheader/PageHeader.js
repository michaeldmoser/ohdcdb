import { Navbar, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './pageheader.module.scss';

const propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
};

/**
 * Component to act as the header for the page
 *
 * @param {string} props.className
 * @param {string} props.title
 * @returns
 */
const PageHeader = ({ className, title }) => {
    return (
        <header
            className={'border-bottom border-secondary ' + (className ?? '')}
        >
            <Navbar bg='light' expand='lg'>
                <Container fluid>
                    <Navbar.Brand as='h2'>{title ?? 'Dashboard'}</Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    );
};

PageHeader.propTypes = propTypes;

export default PageHeader;
