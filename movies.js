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
                    <div class="movie-card" style="position: relative; display: inline-block;">
        <span style="position: absolute; top: 8px; right: 8px; background: #e50914; color: #fff; font-size: 9px; font-weight: bold; padding: 2px 5px; border-radius: 4px; z-index: 10;">4K UHD</span>
        <img src="${movie.poster}" alt="${movie.title}" style="display: block;">
        <h3 class="movie-title">${movie.title}</h3>
        <p>${movie.description || ''}</p>
        <a href="${movie.video_url}" target="_blank" class="watch-now-btn">Watch Now</a>
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
