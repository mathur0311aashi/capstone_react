import React from 'react';
import '../index.css';

const Card = ({ title, image, description, price, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={title} className="card-img" />

      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{description}</p>

        {price && <p className="card-price">💰 {price}</p>}

        <button className="card-btn">View Details</button>
      </div>
    </div>
  )
}

export default Card