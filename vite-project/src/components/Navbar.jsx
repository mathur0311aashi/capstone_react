import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Navbar = ({toggleTheme}) => {
  return (
    <nav className="navbar">
      <h2 className="logo">Travel Planner</h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/planner">Planner</Link></li>
        <li><Link to="/recommendations">Recommendations</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>

      <button className="theme-btn" onClick={toggleTheme}>
        🌙 / ☀️
      </button>
    </nav>
  )
}

export default Navbar;
