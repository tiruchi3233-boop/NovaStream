const sheetId = '1KsW_umfHcm31DtoFuTcy5Z5t8Plq-0WhrlqY65cmcyo';
const url = `https://opensheet.elk.sh/${sheetId}/Books`;

// 1. Google Sheets से बुक्स लोड करना
fetch(url)
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('books-container');
    if (!container) return;
    container.innerHTML = '';

    data.forEach(book => {
      if (book.title) {
        const bookCard = `
                              <div class="book-card" style="position: relative; display: inline-block; min-width: 150px; margin: 10px; text-align: center; color: white;">
            <span style="position: absolute; top: 8px; right: 8px; background: #e50914; color: #fff; font-size: 9px; font-weight: bold; padding: 2px 5px; border-radius: 4px; z-index: 10;">4K UHD</span>
            <img src="${book.cover}" alt="${book.title}" style="width: 100px; height: 150px; object-fit: cover; border-radius: 6px; display: block;">
            <h4 class="book-title" style="margin: 8px 0; font-size: 14px;">${book.title}</h4>
            <a href="${book.read_url}" target="_blank" class="watch-now-btn">Read PDF</a>
          </div>
        `;
        container.innerHTML += bookCard;
      }
    });
  })
  .catch(error => console.error('Error fetching books:', error));


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

    // मूवीज़ और बुक्स दोनों को खोजना
    const allCards = document.querySelectorAll('.book-card, #movies-container > div, .movie-card');

    allCards.forEach(card => {
      const titleText = card.innerText || '';
      
      if (titleText.toLowerCase().includes(query)) {
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
          padding: 8px;
          border-bottom: 1px solid #1e293b;
          cursor: pointer;
        `;
        item.onmouseover = () => item.style.backgroundColor = '#1e293b';
        item.onmouseout = () => item.style.backgroundColor = 'transparent';

        item.innerHTML = `
          ${imgSrc ? `<img src="${imgSrc}" style="width: 35px; height: 50px; object-fit: cover; border-radius: 4px;">` : ''}
          <div style="flex: 1; text-align: left;">
            <div style="color: #fff; font-size: 13px; font-weight: 500;">${titleText.split('\n')[0]}</div>
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

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.style.display = 'none';
    }
  });
}
