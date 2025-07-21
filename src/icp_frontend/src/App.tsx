import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Governance from './pages/Governance';
import Cover from './pages/Cover';
import Pool from './pages/Pool';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/cover" element={<Cover />} />
        <Route path="/pool" element={<Pool />} />
      </Routes>
    </Router>
  );
};

export default App;