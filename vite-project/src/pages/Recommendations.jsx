import React, {useContext, useEffect, useState} from 'react';
import { AppContext } from '../context/AppContext';
import Card from '../components/Card';
import Loader from '../components/Loader';

const Recommendations = () => {
    const { place, setRecommendations } = useContext(AppContext);
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // 🔁 Dummy data (replace with API later)
    setTimeout(() => {
      const places = [
        {
          id: 1,
          title: "City Park",
          image: "https://source.unsplash.com/300x200/?park",
          description: `Beautiful park in ${place}`
        },
        {
          id: 2,
          title: "Historic Museum",
          image: "https://source.unsplash.com/300x200/?museum",
          description: `Famous museum in ${place}`
        },
        {
          id: 3,
          title: "Shopping Street",
          image: "https://source.unsplash.com/300x200/?shopping",
          description: `Popular market in ${place}`
        }
      ];

      setData(places);
      setLoading(false);
    }, 1000);
  }, [place]);

  const handleSelect = (item) => {
    setRecommendations((prev) => [...prev, item]);
  };
  return (
        <div className="recommend-page">
      <h2>Places to Visit in {place || "your destination"} 📍</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="recommend-container">
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

export default Recommendations