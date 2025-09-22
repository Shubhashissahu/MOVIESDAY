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
