import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import './dashboard.scss';

function Dashboard() {
    return (
        <>
            <header className='pageheader position-fixed border-bottom border-primary'>
                <Navbar bg='light' expand='lg' className='p-3'>
                    <Navbar.Brand>Dashboard</Navbar.Brand>
                </Navbar>
            </header>
            <aside className='sidebar position-fixed bg-primary vh-100'>
                <Navbar className='flex-column' bg='primary' variant='dark'>
                    <Container>
                        <Navbar.Brand as='h1'>OHDC DB</Navbar.Brand>
                    </Container>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href='/'>Dashboard</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </aside>
            <main>Main Content</main>
            <footer>Footer</footer>
        </>
    );
}

export default Dashboard;
