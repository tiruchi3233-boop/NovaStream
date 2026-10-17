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
    // 1. मुख्य पेज पर दिखाने के लिए पहली 4 मूवीज
    const initialMovies = movies.slice(0, 4);

    let html = initialMovies.map(movie => `
      <div class="movie-card" style="min-width: 150px; margin: 10px; text-align: center; color: white; display: inline-block; vertical-align: top;">
        <div style="position: relative; display: inline-block;">
          <span style="position: absolute; top: 6px; right: 6px; background: #e50914; color: #fff; font-size: 10px; font-weight: bold; padding: 2px 5px; border-radius: 3px;">
            ${movie.badge || "4K UHD"}
          </span>
          <img src="${movie.poster}" alt="${movie.title}" style="width: 100px; height: 150px; object-fit: cover; border-radius: 8px;">
        </div>
        <h3 class="movie-title" style="margin: 8px 0; font-size: 14px; max-width: 130px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${movie.title}</h3>
        <button onclick="openPlayer('${movie.video_url}')" class="watch-now-btn" style="cursor: pointer;">Watch Now</button>
      </div>
    `).join('');

    // 2. 4 मूवीज के बाद "VIEW ALL" का लाल कार्ड (अगर 4 से ज्यादा मूवीज हों)
    if (movies.length > 4) {
      html += `
        <div id="openMoviesModalBtn" style="min-width: 140px; height: 210px; margin: 10px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; border: 1.5px dashed #e50914; border-radius: 10px; background: rgba(229,9,20,0.03); vertical-align: top;">
          <div style="width: 48px; height: 48px; background: #e50914; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 22px; margin-bottom: 12px; box-shadow: 0 4px 10px rgba(229,9,20,0.4);">➔</div>
          <span style="background: #e50914; color: white; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 4px; letter-spacing: 0.5px;">VIEW ALL</span>
        </div>
      `;
    }

    container.innerHTML = html;

    // 3. बुक्स जैसा फुलस्क्रीन 2-कॉलम मॉडल (Overlay Panel)
    const existingModal = document.getElementById("allMoviesModal");
    if (existingModal) existingModal.remove();

    const modalHtml = `
      <div id="allMoviesModal" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #0b0c0f; z-index: 99999; overflow-y: auto; padding: 20px 14px; box-sizing: border-box;">
        
        <!-- हेडर और Cancel (✕) बटन -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; margin-bottom: 16px; border-bottom: 1px solid #1f222a;">
          <h2 style="color: white; font-size: 20px; margin: 0; font-weight: 700; display: flex; align-items: center; gap: 8px;">🎬 All Movies & Shows</h2>
          <span id="closeMoviesModalBtn" style="color: #ffffff; font-size: 28px; font-weight: 300; cursor: pointer; line-height: 1; padding: 4px 8px;">✕</span>
        </div>

        <!-- 2-कॉलम ऊर्ध्वाधर (Vertical) ग्रिड -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px 12px;">
          ${movies.map(movie => `
            <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
              <div style="position: relative; width: 100%; aspect-ratio: 2/3; border-radius: 8px; overflow: hidden; background: #1a1c23;">
                <span style="position: absolute; top: 6px; right: 6px; background: #e50914; color: #fff; font-size: 10px; font-weight: bold; padding: 2px 5px; border-radius: 3px; z-index: 2;">
                  ${movie.badge || "4K UHD"}
                </span>
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              <h3 style="color: white; font-size: 13px; font-weight: 600; margin: 8px 0 6px 0; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${movie.title}</h3>
              <button onclick="openPlayer('${movie.video_url}')" class="watch-now-btn" style="cursor: pointer; width: 100%; max-width: 130px; font-size: 11px; padding: 6px 10px;">Watch Now</button>
            </div>
          `).join('')}
        </div>

      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // 4. ओपन और कैंसिल (✕) का इवेंट लिसनर
    const openBtn = document.getElementById("openMoviesModalBtn");
    const moviesModal = document.getElementById("allMoviesModal");
    const closeBtn = document.getElementById("closeMoviesModalBtn");

    if (openBtn) {
      openBtn.addEventListener("click", () => {
        moviesModal.style.display = "block";
        document.body.style.overflow = "hidden"; // बैकग्राउंड स्क्रोल बंद
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        moviesModal.style.display = "none";
        document.body.style.overflow = "auto"; // वापस मेन पेज स्क्रोल चालू
      });
    }
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

