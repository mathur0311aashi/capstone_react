import React, { useState} from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Card from './components/Card';
import Loader from './components/Loader';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { generateAIResponse } from './services/api';

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Loader />
//       <Card />
//       <Footer />
//     </div>
//   )
// }

  function App() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };
   return (
    <>
      <BrowserRouter>
        <Navbar toggleTheme={toggleTheme} />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;