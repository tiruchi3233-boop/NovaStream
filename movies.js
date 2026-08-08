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

// ==========================================
// TMDB API - Guaranteed Render Fix
// ==========================================

const API_KEY = 'd8e144b86669ba7e5842f87b72071ec9'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

async function initTMDBMovies() {
    const container = document.getElementById('movies-container');
    if (!container) return;

    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=hi-IN`);
        const data = await response.json();
        
        if (!data.results || data.results.length === 0) return;

        // 1. कार्ड्स की HTML बनाना
        const moviesHTML = data.results.map(movie => `
            <div class="movie-card" onclick="playMovieTrailer(${movie.id})" style="min-width: 140px; width: 140px; flex-shrink: 0; cursor: pointer; text-align: center;">
                <img src="${movie.poster_path ? IMAGE_URL + movie.poster_path : 'https://via.placeholder.com/140x200'}" 
                     alt="${movie.title}" 
                     style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; display: block;">
                <h3 style="font-size: 13px; margin-top: 6px; color: #fff; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; width: 100%;">${movie.title}</h3>
            </div>
        `).join('');

        // 2. HTML सेट करना
        container.innerHTML = moviesHTML;

        // 3. कंटेनर का स्टाइल फ़िक्स करना (ताकि गायब न हो)
        container.style.display = 'flex';
        container.style.overflowX = 'auto';
        container.style.gap = '15px';
        container.style.minHeight = '250px';

    } catch (error) {
        console.error("TMDB Fetch Error:", error);
    }
}

async function playMovieTrailer(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
        const data = await response.json();
        const trailer = data.results.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');
        
        if (trailer) {
            window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
        } else {
            alert('इस फिल्म का ट्रेलर उपलब्ध नहीं है।');
        }
    } catch (error) {
        console.error("Trailer Fetch Error:", error);
    }
}

// पेज पूरा लोड होने के 500ms बाद चलाएं ताकि script.js का रिसेट ओवरराइट न करे
window.addEventListener('load', () => {
    setTimeout(initTMDBMovies, 500);
});
