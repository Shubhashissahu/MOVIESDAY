import MovieCard from "../Components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";

function Home() {
  const { searchQuery } = useMovieContext();  // ✅ Global search from Navbar
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load popular movies on first mount
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  // Auto-search when Navbar searchQuery changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) return; // empty search → do nothing

      setLoading(true);
      try {
        const results = await searchMovies(searchQuery);
        setMovies(results);
      } catch (err) {
        console.error(err);
        setError("Failed to search movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]); // 🔥 runs whenever user types in Navbar

  const displayedMovies = searchQuery.trim()
    ? movies // searched list
    : movies; // popular movies

  return (
    <div className="home">

      {loading && <p>Loading movies...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {displayedMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
