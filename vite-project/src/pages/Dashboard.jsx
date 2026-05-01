import React, { useContext} from 'react';
import { AppContext } from '../context/AppContext';
import Card from '../components/Card';

const Dashboard = () => {
    const {
    place,
    days,
    budget,
    hotel,
    transport,
    recommendations,
    resetPlanner
  } = useContext(AppContext);
  return (
    <div className="dashboard">
      <h2>Your Travel Plan ✈️</h2>

      {/* USER INPUT SUMMARY */}
      <div className="summary">
        <h3>Trip Details</h3>
        <p><strong>Destination:</strong> {place || "Not selected"}</p>
        <p><strong>Days:</strong> {days || "Not selected"}</p>
        <p><strong>Budget:</strong> {budget || "Not selected"}</p>
      </div>

      {/* HOTEL */}
      <div className="section">
        <h3>Selected Hotel 🏨</h3>
        {hotel ? (
          <Card {...hotel} />
        ) : (
          <p>No hotel selected</p>
        )}
      </div>

      {/* TRANSPORT */}
      <div className="section">
        <h3>Transport 🚗</h3>
        {transport ? (
          <Card {...transport} />
        ) : (
          <p>No transport selected</p>
        )}
      </div>

      {/* RECOMMENDATIONS */}
      <div className="section">
        <h3>Places to Visit 📍</h3>
        {recommendations.length > 0 ? (
          <div className="dashboard-cards">
            {recommendations.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        ) : (
          <p>No recommendations yet</p>
        )}
      </div>

      {/* RESET BUTTON */}
      <button className="reset-btn" onClick={resetPlanner}>
        Reset Plan
      </button>
    </div>
  )
}

export default Dashboard