import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { useAuth } from 'features/auth/hooks';
import Login from 'features/auth/Login';
import Dashboard from 'scenes/dashboard';
import People from 'features/people';
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
                <Route path='/' element={<Dashboard />}>
                    <Route path='/properties' element={<Properties />} />
                    <Route path='/people' element={<People />} />
                    <Route path='/organizations' element={<Organizations />} />
                </Route>
            </Routes>
            <Toaster />
        </>
    );
};

export default App;
