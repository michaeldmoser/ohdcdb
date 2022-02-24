import { Route, Routes } from 'react-router-dom';

import { useAuth } from 'features/auth/hooks';
import Login from 'features/auth/Login';

function Dashboard() {
    return <div>Dashboard</div>;
}

export const App = () => {
    const token = useAuth();

    if (!token) {
        return (
            <Routes>
                <Route path='' element={<Login />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path='' element={<Dashboard />} />
        </Routes>
    );
};

export default App;
