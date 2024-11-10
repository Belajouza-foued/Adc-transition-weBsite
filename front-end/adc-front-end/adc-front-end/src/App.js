import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from "./components/Profile";

import Dashboard from './components/Dashboard';
function App() {
    return (
        <Router>
        <Routes>
       
            <Route index element={<Login />} />
            <Route path="regiter" element={<Register />} />
            <Route path="profile" element={<Profile />} />
                   <Route path="dashboard" element={<Dashboard />} />

        </Routes>
    </Router>
    );
}


export default App;
