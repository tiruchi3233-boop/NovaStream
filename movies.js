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
// TMDB API Integration for NovaStream
// ==========================================

const API_KEY = 'd8e144b86669ba7e5842f87b72071ec9'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// 1. ट्रेंडिंग फिल्में फैच करने का मुख्य फंक्शन
async function fetchTrendingMovies() {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=hi-IN`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// 2. फिल्मों को स्क्रीन पर दिखाने का फंक्शन
function displayMovies(movies) {
    // index.html में मौजूद id="movies-container" को ढूँढना
    const container = document.getElementById('movies-container');
    
    if (!container) return;

    // फिल्मों के कार्ड्स HTML में जोड़ना
    container.innerHTML = movies.map(movie => `
        <div class="movie-card" style="min-width: 150px; cursor: pointer; text-align: center;" onclick="playTrailer(${movie.id})">
            <img src="${movie.poster_path ? IMAGE_URL + movie.poster_path : 'https://via.placeholder.com/150x225'}" alt="${movie.title}" style="width: 100%; border-radius: 8px;">
            <h3 style="font-size: 14px; margin-top: 5px; color: white;">${movie.title}</h3>
        </div>
    `).join('');
}

// 3. किसी मूवी पर क्लिक करने पर यूट्यूब ट्रेलर खोलने का फंक्शन
async function playTrailer(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
        const data = await response.json();
        
        const trailer = data.results.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');
        
        if (trailer) {
            window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
        } else {
            alert('इस फिल्म का ऑफिशियल ट्रेलर उपलब्ध नहीं है।');
        }
    } catch (error) {
        console.error("Error fetching trailer:", error);
    }
}

// 4. पेज लोड होते ही ऑटोमैटिकली फिल्में फैच करें
document.addEventListener("DOMContentLoaded", fetchTrendingMovies);
