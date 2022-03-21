import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PeopleHeader = () => {
    const navigate = useNavigate();
    const navigateToAddPersonForm = () => {
        navigate('/people/add-person');
    };
    return (
        <header className='d-flex pb-4'>
            <h3>People</h3>
            <div className='ms-auto d-flex align-items-center'>
                <Button size='sm' onClick={navigateToAddPersonForm}>
                    Add Person
                </Button>
            </div>
        </header>
    );
};

export default PeopleHeader;
