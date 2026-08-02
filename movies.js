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
// --- Live Search Functionality for Movies ---
const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const movieContainer = document.getElementById('movies-container');
    
    if (!movieContainer) return;

    const movieCards = movieContainer.querySelectorAll('.book-card, .movie-card, div'); // आपके कार्ड्स को टारगेट करने के लिए
    let hasResults = false;

    movieCards.forEach(card => {
      // कार्ड के अंदर का टेक्स्ट (जैसे फिल्म का नाम) चेक करें
      const text = card.innerText.toLowerCase();
      
      // सुनिश्चित करें कि हम सिर्फ मुख्य कार्ड्स पर फ़िल्टर लगा रहे हैं
      if (text && card.children.length > 0) {
        if (text.includes(searchTerm)) {
          card.style.display = 'block';
          hasResults = true;
        } else {
          card.style.display = 'none';
        }
      }
    });

    // अगर कोई मूवी न मिले तो 'Not Found' मैसेज दिखाना
    let noResultMsg = document.getElementById('no-movies-found');
    if (!hasResults && searchTerm !== '') {
      if (!noResultMsg) {
        noResultMsg = document.createElement('p');
        noResultMsg.id = 'no-movies-found';
        noResultMsg.style.color = '#94a3b8';
        noResultMsg.style.padding = '10px';
        noResultMsg.style.textAlign = 'center';
        noResultMsg.innerText = 'No matching movies found.';
        movieContainer.appendChild(noResultMsg);
      }
    } else if (noResultMsg) {
      noResultMsg.remove();
    }
  });
}
