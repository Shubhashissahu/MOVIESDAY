import "./css/App.css";
import Favorites from './Pages/Favorites';
import Home from './Pages/home';
import { Routes, Route } from 'react-router-dom';
import { MovieProvider, useMovieContext } from "./contexts/MovieContext";
import Navbar from './Components/Navbar';

// This component CAN read context
function AppContent() {
  const { favorites, handleSearch } = useMovieContext();

  return (
    <>
      <Navbar 
        favoritesCount={favorites.length} 
        onSearch={handleSearch} 
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </>
  );
}

// Wrapper keeps Provider on top
function App() {
  return (
    <MovieProvider>
      <AppContent />
    </MovieProvider>
  );
}

export default App;
