import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">

      <div className="home-content">
        <h1 className="home-title">Plan Your Dream Trip 🌍</h1>

        <p className="home-desc">
          Discover the best places, hotels, transport, and cafes — all based on your budget and preferences.
        </p>

        <div className="home-buttons">
          <Link to="/planner">
            <button className="home-btn">Start Planning</button>
          </Link>

          <Link to="/login">
            <button className="home-btn secondary">Login</button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Home