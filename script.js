// script.js - Movies और Search Bar का कोड

document.addEventListener("DOMContentLoaded", function () {
  
  // 1. यहाँ आपने अपने सारे सर्च से जुड़े एलिमेंट्स को परिभाषित कर दिया है
  const searchInput = document.getElementById('searchInput');
  const searchDropdown = document.getElementById('searchDropdown');
  const searchTriggerBtn = document.getElementById('searchTriggerBtn');
  const searchWrapper = document.querySelector('.search-wrapper');
  const searchContainer = document.getElementById('searchContainer');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  // अगर सर्च इनपुट ही नहीं मिलेगा, तो आगे का कोड रोक देगा
  if (!searchInput || !searchDropdown) {
    return;
  }

  // 2. इसके बाद आपका सर्च वाला इवेंट लिसनर (input event) आएगा
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();

    if (query === '') {
      searchDropdown.style.display = 'none';
      searchDropdown.innerHTML = '';
      return;
    }

    searchDropdown.innerHTML = '';
    let matchesFound = 0;

    // केवल Movies वाले कार्ड्स को खोजना
    const movieCards = document.querySelectorAll('.movie-card, #movies-container > div');

    movieCards.forEach(card => {
      const titleEl = card.querySelector('.movie-title, h3, h4');
      const titleText = titleEl ? titleEl.innerText.trim() : '';

      if (titleText && titleText.toLowerCase().includes(query)) {
        matchesFound++;

        const img = card.querySelector('img');
        const imgSrc = img ? img.src : '';
        const link = card.querySelector('a');
        const actionUrl = link ? link.href : '#';

        const item = document.createElement('div');
        item.style.cssText = `
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-bottom: 1px solid #1e293b;
          cursor: pointer;
        `;
        item.onmouseover = () => item.style.backgroundColor = '#1e293b';
        item.onmouseout = () => item.style.backgroundColor = 'transparent';

        item.innerHTML = `
          ${imgSrc ? `<img src="${imgSrc}" style="width: 35px; height: 50px; object-fit: cover; border-radius: 4px;">` : ''}
          <div style="flex: 1; text-align: left;">
            <div style="color: #fff; font-size: 13px; font-weight: 500;">${titleText}</div>
            <span style="color: #38bdf8; font-size: 11px;">Watch Now</span>
          </div>
        `;

        item.addEventListener('click', () => {
          if (actionUrl && actionUrl !== '#' && actionUrl !== window.location.href + '#') {
            window.location.href = actionUrl;
          }
        });

        searchDropdown.appendChild(item);
      }
    });

    if (matchesFound === 0) {
      searchDropdown.innerHTML = `
        <div style="padding: 12px; text-align: center; color: #94a3b8; font-size: 13px;">
          ❌ No movies found for "<b>${e.target.value}</b>"
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

});

