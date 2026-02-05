import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Donate from './pages/Donate';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorLogin from './pages/DonorLogin';
import VolunteerLogin from './pages/VolunteerLogin';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donor-login" element={<DonorLogin />} />
        <Route path="/volunteer-login" element={<VolunteerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App