import React, { createContext, useState, useEffect } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  // 🔐 User
  const [user, setUser] = useState(null);
  // 🧳 Travel Inputs
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState(""); // bronze | silver | gold

  // 📊 Selected Results
  const [hotel, setHotel] = useState(null);
  const [transport, setTransport] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // 🌗 Theme
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  // 🔁 Reset Planner
  const resetPlanner = () => {
    setPlace("");
    setDays("");
    setBudget("");
    setHotel(null);
    setTransport(null);
    setRecommendations([]);
  };

  // ✅ SAVE DATA
  useEffect(() => {
    localStorage.setItem("tripData", JSON.stringify({
      place, days, budget, hotel, transport, recommendations
    }));
  }, [place, days, budget, hotel, transport, recommendations]);

  // ✅ LOAD DATA
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tripData"));
    if (saved) {
      setPlace(saved.place || "");
      setDays(saved.days || "");
      setBudget(saved.budget || "");
    }
  }, []);


  return (
    <AppContext.Provider
      value={{
        user, setUser,
        place, setPlace,
        days, setDays,
        budget, setBudget,
        hotel, setHotel,
        transport, setTransport,
        recommendations, setRecommendations,
        dark, toggleTheme,
        resetPlanner
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext