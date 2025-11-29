import React from "react";
import "../css/Moviecard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { favourites, addToFavourites, removeFromFavourites } = useMovieContext();

  const isFavourite = favourites.some((fav) => fav.id === movie.id);

  function onFavouriteClick() {
    if (isFavourite) {
      removeFromFavourites(movie.id);
    } else {
      addToFavourites(movie);
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
          <button
            className={`favourite-btn ${isFavourite ? "active" : ""}`}
            onClick={onFavouriteClick}
          >
            ♥
          </button>
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
