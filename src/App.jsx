import "./css/App.css";
import Favorites from './Pages/Favorites';
import Home from './Pages/home';
import { Routes, Route } from 'react-router-dom';
import { MovieProvider } from "./contexts/MovieContext";
import Navbar from './Components/Navbar';

function App() {
  return (
    <MovieProvider>
      <div>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
