import React from "react";
import "../css/Moviecard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { favorites, addToFavorites, removeFromFavorites } = useMovieContext();

  const isFavourite = favorites?.some((fav) => fav.id === movie.id) ?? false;

  function onFavouriteClick() {
    if (isFavourite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
        />

        <div className="movie-overlay">
          {/* Heart toggle */}
          <button
            className={`favorite-btn ${isFavourite ? "active" : ""}`}
            onClick={onFavouriteClick}
          >
            {isFavourite ? "♥" : "♡"}
          </button>

          {/* Action buttons at the bottom */}
          <div className="action-buttons">
            {!isFavourite ? (
              <button
                className="add-btn"
                onClick={() => addToFavorites(movie)}
              >
                ➕ Add to Favorites
              </button>
            ) : (
              <button
                className="remove-btn"
                onClick={() => removeFromFavorites(movie.id)}
              >
                ❌ Remove from Favorites
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}
export default MovieCard;
