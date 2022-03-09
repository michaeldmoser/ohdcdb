import { Button } from 'react-bootstrap';
import { BoxArrowDownLeft } from 'react-bootstrap-icons';
import { useAuth } from './hooks';

function LogoutButton() {
    const [, , logoutUser] = useAuth();

    const handleLogout = () => {
        logoutUser();
    };

    return (
        <Button variant='link' id='logout' onClick={handleLogout}>
            <BoxArrowDownLeft /> Logout
        </Button>
    );
}

export default LogoutButton;
