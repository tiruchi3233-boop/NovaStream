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
      // 1. केवल पहली 4 मूवीज को रेंडर करने का फंक्शन
      function renderMovies(movieList, isGrid = false) {
        let cardsHtml = movieList.map(movie => `
          <div class="movie-card" style="${isGrid ? 'width: 100%; margin: 8px 0;' : 'min-width: 150px; margin: 10px;'} text-align: center; color: white;">
            <!-- पोस्टर और बैज का Wrapper -->
            <div style="position: relative; display: inline-block; width: 100%;">
              <span style="position: absolute; top: 6px; right: 6px; background: #e50914; color: #fff; font-size: 10px; font-weight: bold; padding: 2px 5px; border-radius: 3px;">
                ${movie.badge || "4K UHD"}
              </span>
              <img src="${movie.poster}" alt="${movie.title}" style="width: 100%; max-width: 150px; height: 210px; object-fit: cover; border-radius: 8px;">
            </div>

            <h3 class="movie-title" style="margin: 8px 0; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${movie.title}</h3>
            <button onclick="openPlayer('${movie.video_url}')" class="watch-now-btn" style="cursor: pointer;">Watch Now</button>
          </div>
        `).join('');

        // मुख्य पेज पर 4 मूवीज के बाद "VIEW ALL" का कार्ड जोड़ना
        if (!isGrid && movies.length > 4) {
          cardsHtml += `
            <div id="moviesViewAllCard" style="min-width: 140px; margin: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; border: 1px dashed #e50914; border-radius: 8px; padding: 20px 10px;">
              <div style="width: 44px; height: 44px; background: #e50914; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; margin-bottom: 10px;">➔</div>
              <span style="background: #e50914; color: white; font-size: 11px; font-weight: bold; padding: 3px 8px; border-radius: 4px;">VIEW ALL</span>
            </div>
          `;
        }

        container.innerHTML = cardsHtml;

        // "VIEW ALL" कार्ड पर क्लिक करने पर 2-कॉलम वर्टिकल लिस्ट खोलना
        const viewAllCard = document.getElementById("moviesViewAllCard");
        if (viewAllCard) {
          viewAllCard.addEventListener("click", () => {
            // कंटेनर को 2-कॉलम ग्रिड में बदलना
            container.style.display = "grid";
            container.style.gridTemplateColumns = "repeat(2, 1fr)";
            container.style.gap = "12px";
            container.style.overflowX = "visible";

            // पूरी मूवीज लोड करना
            renderMovies(movies, true);
          });
        }
      }

      // शुरुआत में केवल पहली 4 मूवीज दिखाना
      renderMovies(movies.slice(0, 4), false);
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

