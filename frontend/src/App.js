import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { useAuth } from 'features/auth/hooks';
import Login from 'features/auth/Login';
import Dashboard from 'scenes/dashboard';

export const App = () => {
    const [accessToken] = useAuth();

    if (!accessToken) {
        return (
            <>
                <Routes>
                    <Route path='*' element={<Login />} />
                </Routes>
                <Toaster />
            </>
        );
    }

    return (
        <>
            <Routes>
                <Route path='*' element={<Dashboard />} />
            </Routes>
            <Toaster />
        </>
    );
};

export default App;
