import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

// Custom hook to use context
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      setFavourites(JSON.parse(storedFavs));
    }
  }, []);

  // Save to localStorage when favourites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favourites));
  }, [favourites]);

  // ✅ Add to favorites (avoid duplicates)
  const addToFavourites = (movie) => {
    setFavourites((prev) => {
      if (!prev.some((fav) => fav.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  // ✅ Remove from favorites
  const removeFromFavourites = (movieId) => {
    setFavourites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  return (
    <MovieContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites }}
    >
      {children}
    </MovieContext.Provider>
  );
};
