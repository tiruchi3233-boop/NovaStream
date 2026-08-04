// script.js
import { loadBooks } from './books.js';
// अगर movies.js भी है तो: import { loadMovies } from './movies.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. डेटा लोड करें
  loadBooks();
  // loadMovies();

  // 2. Movies और Books दोनों के लिए ड्रॉपडाउन लाइव सर्च
  const searchInput = document.getElementById('searchInput');
  const searchDropdown = document.getElementById('searchDropdown');

  if (searchInput && searchDropdown) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase().trim();

      if (query === '') {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
        return;
      }

      searchDropdown.innerHTML = '';
      let matchesFound = 0;

      // मूवीज़ और बुक्स दोनों के कार्ड्स खोजना
      const allCards = document.querySelectorAll('.book-card, #movies-container > div, .movie-card');

      allCards.forEach(card => {
        const titleEl = card.querySelector('.movie-title, .book-title, h3, h4');
        const titleText = titleEl ? titleEl.innerText : '';

        if (titleText.toLowerCase().includes(query)) {
          matchesFound++;

          const img = card.querySelector('img');
          const imgSrc = img ? img.src : '';
          
          // रीड या डाउनलोड लिंक निकालना
          const link = card.querySelector('a');
          const actionUrl = link ? link.href : '#';

          const item = document.createElement('div');
          item.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px;
            border-bottom: 1px solid #1e293b;
            cursor: pointer;
          `;
          item.onmouseover = () => item.style.backgroundColor = '#1e293b';
          item.onmouseout = () => item.style.backgroundColor = 'transparent';

          item.innerHTML = `
            ${imgSrc ? `<img src="${imgSrc}" style="width: 35px; height: 50px; object-fit: cover; border-radius: 4px;">` : ''}
            <div style="flex: 1; text-align: left;">
              <div style="color: #fff; font-size: 13px; font-weight: 500;">${titleText}</div>
              <span style="color: #38bdf8; font-size: 11px;">Watch / Read Now</span>
            </div>
          `;

          item.addEventListener('click', () => {
            if (actionUrl && actionUrl !== '#') {
              window.open(actionUrl, '_blank');
            }
          });

          searchDropdown.appendChild(item);
        }
      });

      if (matchesFound === 0) {
        searchDropdown.innerHTML = `
          <div style="padding: 12px; text-align: center; color: #94a3b8; font-size: 13px;">
            ❌ No results found for "<b>${e.target.value}</b>"
          </div>
        `;
      }

      searchDropdown.style.display = 'block';
    });

    // बाहर क्लिक करने पर ड्रॉपडाउन बंद करना
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.style.display = 'none';
      }
    });
  }
});

