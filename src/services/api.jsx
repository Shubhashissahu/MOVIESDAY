const API_KEY = "30e0ea5c62b00c4566caaa30784ffaa7";
const BASE_URL = "https://api.themoviedb.org/3"; // 🔁 Add `/3` to BASE_URL

// Fetch popular movies
export const getPopularMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!response.ok) throw new Error("Failed to fetch popular movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error in getPopularMovies:", error);
    return [];
  }
};
// Make sure BASE_URL and API_KEY already exist in this file.
// Example:
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const BASE_URL = "https://api.themoviedb.org/3";

export async function getMoviesByGenre(genreId) {
  try {
    const res = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&sort_by=popularity.desc`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch movies by genre");
    }

    const data = await res.json();
    // TMDB returns results at data.results
    return data.results || [];
  } catch (err) {
    console.error("getMoviesByGenre error:", err);
    throw err;
  }
}


// Fetch movies by search query
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Failed to search movies");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error in searchMovies:", error);
    return [];
  }
};
