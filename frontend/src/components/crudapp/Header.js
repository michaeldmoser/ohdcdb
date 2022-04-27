import { useContext } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Context from './context';

export const Header = ({ title, addButtonText, searchPlaceholder }) => {
    const { setSearch, search } = useContext(Context);

    const navigate = useNavigate();
    const navigateToAddRecordForm = () => {
        navigate('add');
    };

    return (
        <header className='mb-3 row'>
            <Col as='h3' sm={2}>
                {title || 'Records'}
            </Col>
            <Col sm={8}>
                <Form.Control
                    type='search'
                    name='search'
                    placeholder={searchPlaceholder ?? 'Search...'}
                    required
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </Col>
            <Col sm={2} className='d-flex align-items-center'>
                <Button
                    className='ms-auto'
                    size='sm'
                    onClick={navigateToAddRecordForm}
                >
                    {addButtonText ?? 'Add record'}
                </Button>
            </Col>
        </header>
    );
};

export default Header;
