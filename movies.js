// OpenSheet API URL for Movies
const MOVIES_API_URL = "https://opensheet.elk.sh/1ygQNR0MZ5mpqvBYeNjXNFu4NPMIbZS330GLDTXgm3D4/movies";

async function fetchMovies() {
  const container = document.getElementById("movies-container");
  
  try {
    const response = await fetch(MOVIES_API_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const movies = await response.json();
    
    if (container) {
      container.innerHTML = movies.map(movie => `
        <div class="movie-card">
          <img src="${movie.poster}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>${movie.description || ''}</p>
          <a href="${movie.video_url}" target="_blank">Watch Now</a>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error("Error loading movies:", error);
    if (container) {
      container.innerHTML = "<p>Movies could not be loaded.</p>";
    }
  }
}

document.addEventListener("DOMContentLoaded", fetchMovies);
