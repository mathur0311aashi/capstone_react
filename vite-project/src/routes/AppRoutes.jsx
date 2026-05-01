import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Planner from '../pages/Planner';
import Recommendations from '../pages/Recommendations';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Transport from '../pages/Transport';
import Hotels from '../pages/Hotels';
import Cafes from '../pages/Cafes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/transport" element={<Transport />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/cafes" element={<Cafes />} />
    </Routes>
  )
}

export default AppRoutes;