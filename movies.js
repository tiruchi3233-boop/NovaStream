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
                      <div class="movie-card" style="min-width: 150px; margin: 10px; text-align: center; color: white;">
        <!-- पोस्टर और बैज काWrapper -->
        <div style="position: relative; display: inline-block;">
          <span style="position: absolute; top: 6px; right: 6px; background: #e50914; color: #fff; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; z-index: 10;">4K UHD</span>
          <img src="${movie.poster}" alt="${movie.title}" style="width: 100px; height: 150px; object-fit: cover; border-radius: 6px; display: block;">
        </div>
        
        <h3 class="movie-title" style="margin: 8px 0; font-size: 14px;">${movie.title}</h3>
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

