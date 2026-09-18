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
        <button onclick="openPlayer('${movie.video_url}')" class="watch-now-btn" style="cursor:pointer;">Watch Now</button>
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
function openPlayer(url) {
  // अगर लिंक में embed नहीं है तो यह खुद ब खुद embed बना देगा
  let embedUrl = url;
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1].split('?')[0];
    embedUrl = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
  } else if (url.includes('watch?v=')) {
    const id = url.split('watch?v=')[1].split('&')[0];
    embedUrl = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
  }

  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('modalIframe');
  iframe.src = embedUrl;
  modal.style.display = 'flex';
}

function closePlayer() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('modalIframe');
  iframe.src = ''; // वीडियो बंद करने के लिए
  modal.style.display = 'none';
}

