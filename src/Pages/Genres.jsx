import React, { useState, useEffect } from "react";
import "../css/Genres.css";
import { GENRES } from "../constants/genres";
import { getMoviesByGenre } from "../services/api";
import MovieCard from "../Components/MovieCard";

function Genres() {
  const [selectedGenreId, setSelectedGenreId] = useState(GENRES[0].id); // default: first genre
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies when selectedGenreId changes
  useEffect(() => {
    const fetchGenreMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await getMoviesByGenre(selectedGenreId);
        setMovies(results);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies for this genre.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [selectedGenreId]);

  return (
    <div className="genres-page">
      <h2>Browse by Genre</h2>

      {/* Genre Pills/List */}
      <div className="genres-list">
        {GENRES.map((genre) => (
          <button
            key={genre.id}
            className={`genre-pill ${
              genre.id === selectedGenreId ? "active" : ""
            }`}
            onClick={() => setSelectedGenreId(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Status */}
      {loading && <p className="genres-status">Loading movies...</p>}
      {error && <p className="genres-status error">{error}</p>}

      {/* Movies Grid */}
      <div className="movies-grid">
        {!loading && !error && movies.length === 0 && (
          <p className="genres-status">No movies found for this genre.</p>
        )}

        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Genres;
