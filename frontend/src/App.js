// app.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from 'scenes/Dashboard';
import Login from 'scenes/Login';
import { useToken } from 'features/User';

export const App = () => {
    const token = useToken();

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
