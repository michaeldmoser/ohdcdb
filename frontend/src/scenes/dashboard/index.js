import { Container, Nav, Navbar as BootstrapNavBar } from 'react-bootstrap';
import {
    People as PeopleIcon,
    Building,
    HouseDoor,
    PieChart,
} from 'react-bootstrap-icons';
import { NavLink, Outlet } from 'react-router-dom';

import LogoutButton from 'features/auth/LogoutButton';

import styles from './dashboard.module.scss';

const Main = ({ children }) => (
    <main className='col-10 bg-light p-3'>{children}</main>
);

const Navbar = () => {
    const addLinkClasses = ({ isActive }) =>
        'nav-link' + (isActive ? ' active' : '');

    return (
        <BootstrapNavBar
            className='col-2 flex-column align-items-start p-3'
            bg='primary'
            variant='dark'
        >
            <BootstrapNavBar.Brand href='/'>OHDC DB</BootstrapNavBar.Brand>
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
        </BootstrapNavBar>
    );
};

function Dashboard() {
    return (
        <>
            <Navbar />
            <Main>
                <Outlet />
            </Main>
            {/* <aside
                className={styles.sidebar + ' position-fixed bg-primary vh-100'}
            >
                <Container
                    fluid
                    className='navbar border-bottom border-secondary'
                >
                    <h1 className='text-light navbar-brand'>OHDC DB</h1>
                </Container>

                <footer
                    className={
                        styles.navfooter +
                        ' container position-fixed p-3 border-top border-secondary'
                    }
                >
                    <LogoutButton />
                </footer>
            </aside> */}
        </>
    );
}

export default Dashboard;
