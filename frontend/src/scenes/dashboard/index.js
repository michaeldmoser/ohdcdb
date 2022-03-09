import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import {
    People as PeopleIcon,
    Building,
    HouseDoor,
    PieChart,
    BoxArrowDownLeft,
} from 'react-bootstrap-icons';
import { NavLink, Route, Routes } from 'react-router-dom';

import LogoutButton from 'features/auth/LogoutButton';

import styles from './dashboard.module.scss';

function Properties() {
    return (
        <>
            <p>Properties</p>
        </>
    );
}

function Organizations() {
    return (
        <>
            <p>Organizations</p>
        </>
    );
}

function People() {
    return (
        <>
            <p>People</p>
        </>
    );
}

function Dashboard() {
    const addLinkClasses = ({ isActive }) =>
        'nav-link' + (isActive ? ' active' : '');

    return (
        <>
            <header
                className={
                    styles.pageheader +
                    ' position-fixed border-bottom border-secondary'
                }
            >
                <Navbar bg='light' expand='lg'>
                    <Container fluid>
                        <Navbar.Brand>Dashboard</Navbar.Brand>
                    </Container>
                </Navbar>
            </header>
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
                                    <NavLink to='/' className={addLinkClasses}>
                                        <PieChart /> Dashboard
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink
                                        to='/properties'
                                        className={addLinkClasses}
                                    >
                                        <HouseDoor /> Properties
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink
                                        to='/people'
                                        className={addLinkClasses}
                                    >
                                        <PeopleIcon /> People
                                    </NavLink>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavLink
                                        to='/organizations'
                                        className={addLinkClasses}
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
            <main className={styles.dashboard + ' p-3 bg-light'}>
                <Routes>
                    <Route path='/properties' element={<Properties />} />
                    <Route path='/people' element={<People />} />
                    <Route path='/organizations' element={<Organizations />} />
                </Routes>
            </main>
            <footer
                className={
                    styles.pagefooter +
                    ' p-3 border-top border-secondary bg-light'
                }
            >
                Footer
            </footer>
        </>
    );
}

export default Dashboard;
