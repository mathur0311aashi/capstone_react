import React, { useContext, useEffect, useState} from 'react';
import { AppContext } from '../context/AppContext';
import Card from '../components/Card';
import '../index.css';

const Cafes = () => {
    const { place } = useContext(AppContext);
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Dummy data (replace with API later)
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setCafes([
        {
          id: 1,
          title: "Cafe Mocha",
          image: "https://source.unsplash.com/300x200/?cafe",
          description: `Popular cafe in ${place}`,
          price: "₹500 for two"
        },
        {
          id: 2,
          title: "Coffee House",
          image: "https://source.unsplash.com/300x200/?coffee",
          description: `Best coffee spot in ${place}`,
          price: "₹300 for two"
        },
        {
          id: 3,
          title: "Urban Brew",
          image: "https://source.unsplash.com/300x200/?restaurant",
          description: `Trendy hangout place in ${place}`,
          price: "₹700 for two"
        }
      ]);

      setLoading(false);
    }, 1000);
  }, [place]);
  return (
    <div className="cafes-page">
      <h2>Cafes in {place || "your destination"} ☕</h2>

      {loading ? (
        <p>Loading cafes...</p>
      ) : (
        <div className="cafes-container">
          {cafes.map((cafe) => (
            <Card
              key={cafe.id}
              title={cafe.title}
              image={cafe.image}
              description={cafe.description}
              price={cafe.price}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Cafes