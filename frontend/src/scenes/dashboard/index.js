import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import {
    People as PeopleIcon,
    Building,
    HouseDoor,
    PieChart,
    BoxArrowDownLeft,
} from 'react-bootstrap-icons';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import LogoutButton from 'features/auth/LogoutButton';

import styles from './dashboard.module.scss';

import PageHeader from 'components/pageheader';

function Dashboard() {
    const addLinkClasses = ({ isActive }) =>
        'nav-link' + (isActive ? ' active' : '');
    const location = useLocation();

    return (
        <>
            <div className={styles.mainbody + ' bg-light'}>
                <PageHeader
                    className={styles.pageheader + ' position-fixed'}
                    title={location.state?.pageheader}
                />
                <main className={styles.dashboard + ' p-3 '}>
                    <Outlet />
                </main>
                <footer
                    className={
                        styles.pagefooter +
                        ' p-3 border-top border-secondary bg-light'
                    }
                >
                    Footer
                </footer>
            </div>
            <aside
                className={styles.sidebar + ' position-fixed bg-primary vh-100'}
            >
                <Container
                    fluid
                    className='navbar border-bottom border-secondary'
                >
                    <h1 className='text-light navbar-brand'>OHDC DB</h1>
                </Container>
                <Container fluid className='d-flex'>
                    <Navbar
                        className='d-flex flex-column'
                        bg='primary'
                        variant='dark'
                    >
                        <Container fluid className='flex-column'>
                            <Nav className='flex-column'>
                                <Nav.Item>
                                    <NavLink
                                        to='/'
                                        className={addLinkClasses}
                                        state={{ pageheader: 'Dashboard' }}
                                    >
                                        <PieChart /> Dashboard
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink
                                        to='/properties'
                                        className={addLinkClasses}
                                        state={{ pageheader: 'Properties' }}
                                    >
                                        <HouseDoor /> Properties
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink
                                        to='/people'
                                        className={addLinkClasses}
                                        state={{ pageheader: 'People' }}
                                    >
                                        <PeopleIcon /> People
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink
                                        to='/organizations'
                                        className={addLinkClasses}
                                        state={{ pageheader: 'Organizations' }}
                                    >
                                        <Building /> Organizations
                                    </NavLink>
                                </Nav.Item>
                            </Nav>
                        </Container>
                    </Navbar>
                </Container>
                <footer
                    className={
                        styles.navfooter +
                        ' container position-fixed p-3 border-top border-secondary'
                    }
                >
                    <LogoutButton />
                </footer>
            </aside>
        </>
    );
}

export default Dashboard;
