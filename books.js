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
                                      <div class="book-card" style="min-width: 150px; margin: 10px; text-align: center; color: white;">
            <!-- कवर और बैज का Wrapper -->
            <div style="position: relative; display: inline-block;">
              <span style="position: absolute; top: 6px; right: 6px; background: #e50914; color: #fff; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; z-index: 10;">4K UHD</span>
              <img src="${book.cover}" alt="${book.title}" style="width: 100px; height: 150px; object-fit: cover; border-radius: 6px; display: block;">
            </div>

            <h4 class="book-title" style="margin: 8px 0; font-size: 14px;">${book.title}</h4>
            <!-- 1. ऑनलाइन पढ़ने के लिए पॉप-अप बटन -->
<button onclick="openPdfModal('${book.read_url}')" class="watch-now-btn" style="margin-right: 5px; cursor: pointer;">
  📖 Read Online
</button>

<!-- 2. डायरेक्ट डाउनलोड बटन -->
<a href="${book.read_url}" download class="watch-now-btn" style="text-decoration: none;">
  📥 Download
</a>

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
      const titleEl = card.querySelector('.movie-title, .book-title, h3, h4');
const titleText = titleEl ? titleEl.innerText : '';

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

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.style.display = 'none';
    }
  });
}// पॉप-अप (Modal) में PDF खोलने और बंद करने का कोड
function openPdfModal(url) {
  let modal = document.getElementById('pdf-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'pdf-modal';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.85); display: flex; justify-content: center;
      align-items: center; z-index: 9999; padding: 10px; box-sizing: border-box;
    `;
    modal.innerHTML = `
      <div style="position: relative; width: 100%; max-width: 800px; height: 90vh; background: #1a1a1a; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;">
        <button onclick="closePdfModal()" style="position: absolute; top: 10px; right: 15px; background: #ff4757; color: white; border: none; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-weight: bold; z-index: 10000;">✕ Close</button>
        <iframe id="pdf-frame" src="" width="100%" height="100%" style="border: none; margin-top: 40px;"></iframe>
      </div>
    `;
    document.body.appendChild(modal);
  }
  document.getElementById('pdf-frame').src = url;
  modal.style.display = 'flex';
}

function closePdfModal() {
  const modal = document.getElementById('pdf-modal');
  if (modal) {
    modal.style.display = 'none';
    document.getElementById('pdf-frame').src = '';
  }
}

