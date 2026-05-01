import React, { useContext, useEffect, useState} from 'react';
import { AppContext } from '../context/AppContext';
import Card from '../components/Card';
import Loader from '../components/Loader';

const Hotels = () => {
     const { place, budget, setHotel } = useContext(AppContext);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // 🔁 Dummy data based on budget
    let data = [];

    if (budget === "bronze") {
      data = [
        {
          id: 1,
          title: "Budget Stay",
          image: "https://source.unsplash.com/300x200/?hotel,cheap",
          description: `Affordable hotel in ${place}`,
          price: "₹1000/night"
        }
      ];
    } else if (budget === "silver") {
      data = [
        {
          id: 2,
          title: "Comfort Hotel",
          image: "https://source.unsplash.com/300x200/?hotel",
          description: `Comfortable stay in ${place}`,
          price: "₹3000/night"
        }
      ];
    } else if (budget === "gold") {
      data = [
        {
          id: 3,
          title: "Luxury Resort",
          image: "https://source.unsplash.com/300x200/?luxury,hotel",
          description: `Premium stay in ${place}`,
          price: "₹7000/night"
        }
      ];
    }

    setTimeout(() => {
      setHotels(data);
      setLoading(false);
    }, 1000);
  }, [place, budget]);
  return (
    <div className="hotel-page">
      <h2>Hotels in {place || "your destination"} 🏨</h2>
      <p>Budget: {budget || "Not selected"}</p>

      {loading ? (
        <Loader />
      ) : (
        <div className="hotel-container">
          {hotels.map((item) => (
            <Card
              key={item.id}
              {...item}
              onClick={() => setHotel(item)} // save selected hotel
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Hotels