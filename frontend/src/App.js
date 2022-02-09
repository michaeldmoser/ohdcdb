// app.js
import React from 'react';
import Login from './auth';
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';

const About = () => <div>This is the about page.</div>;

export const App = () => (
    <Routes>
        <Route path='/about' element={<About />} />
        <Route path='' element={<Login />} />
    </Routes>
);

export default App;
