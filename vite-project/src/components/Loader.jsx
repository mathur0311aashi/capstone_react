import React from 'react';
import '../index.css';

const Loader = () => {
  return (
   <div className="loader-container">
      <div className="loader"></div>
      <p className="loader-text">Loading your travel plan...</p>
    </div>
  )
}

export default Loader