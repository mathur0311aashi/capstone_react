import React, { useContext, useEffect, useState} from 'react'
import { AppContext } from '../context/AppContext';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const Transport = () => {
      const { place, budget, setTransport } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
     if (!place || !budget) {
    navigate("/planner");
    return;
  }
// }, [place, budget, navigate]);
//     setLoading(true);

    let transportOptions = [];

    // 🔁 Budget-based transport
    if (budget === "bronze") {
      transportOptions = [
        {
          id: 1,
          title: "Bus",
          image: "https://source.unsplash.com/300x200/?bus",
          description: `Affordable bus travel in ${place}`,
          price: "₹500"
        },
        {
          id: 2,
          title: "Train",
          image: "https://source.unsplash.com/300x200/?train",
          description: `Budget train option to ${place}`,
          price: "₹800"
        }
      ];
    } else if (budget === "silver") {
      transportOptions = [
        {
          id: 3,
          title: "Cab",
          image: "https://source.unsplash.com/300x200/?taxi",
          description: `Comfortable cab service in ${place}`,
          price: "₹2000"
        },
        {
          id: 4,
          title: "AC Train",
          image: "https://source.unsplash.com/300x200/?train,ac",
          description: `AC train journey to ${place}`,
          price: "₹1500"
        }
      ];
    } else if (budget === "gold") {
      transportOptions = [
        {
          id: 5,
          title: "Flight",
          image: "https://source.unsplash.com/300x200/?airplane",
          description: `Fast flight to ${place}`,
          price: "₹5000"
        },
        {
          id: 6,
          title: "Private Car",
          image: "https://source.unsplash.com/300x200/?car",
          description: `Luxury private ride in ${place}`,
          price: "₹4000"
        }
      ];
    }

    setTimeout(() => {
      setData(transportOptions);
      setLoading(false);
    }, 1000);
  }, [place, budget]);

  const handleSelect = (item) => {
    setTransport(item);
    navigate("/recommendations"); // next step
  };

  return (
    <div className="transport-page">
      <h2>Transport Options for {place || "your trip"} 🚗</h2>
      <p>Budget: {budget}</p>
      
      <button onClick={() => navigate("/hotel")}>← Back</button>
    <p>Click on a transport option to continue</p>
      {loading ? (
        <Loader />
      ) : (
        <div className="transport-container">
          {data.map((item) => (
            <Card
              key={item.id}
              {...item}
              onClick={() => handleSelect(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Transport;