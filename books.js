export function loadBooks() {
  const sheetId = '1KsW_umfHcm31DtoFuTcy5Z5t8Plq-0WhrlqY65cmcyo';
  const url = `https://opensheet.elk.sh/${sheetId}/Books`;

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
}

