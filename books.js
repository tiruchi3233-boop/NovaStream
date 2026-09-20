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

            // 1. सही बुक्स फ़िल्टर करें
      const validBooks = data.filter(book => book.title);
      const gridContainer = document.getElementById('all-books-grid');
      if (gridContainer) gridContainer.innerHTML = '';

      // बुक कार्ड बनाने का तरीका
      const createBookCard = (book) => `
        <div class="book-card" style="min-width: 150px; margin: 10px; text-align: center; color: white;">
          <div style="position: relative; display: inline-block;">
            <span style="position: absolute; top: 8px; right: 8px; background: #e50914; color: #FFF; font-size: 10px; font-weight: bold; padding: 2px 5px; border-radius: 3px;">4K UHD</span>
            <img src="${book.cover}" alt="${book.title}" style="width: 100px; height: 150px; object-fit: cover; border-radius: 8px;">
          </div>
          <h4 class="book-title" style="margin: 8px 0; font-size: 14px;">${book.title}</h4>
          <a href="https://docs.google.com/viewer?url=${encodeURIComponent(book.read_url)}" target="_blank" class="watch-now-btn" style="text-decoration: none; display: block; margin-bottom: 6px;">
            📖 Read Online
          </a>
          <a href="${book.read_url}" download class="watch-now-btn" style="text-decoration: none; display: block;">
            📥 Download
          </a>
        </div>
      `;

      // 2. होमपेज: सिर्फ पहली 4 बुक्स
      validBooks.slice(0, 4).forEach(book => {
        container.innerHTML += createBookCard(book);
      });

      // 3. 4 बुक्स के बाद "View All" (More) का बटन
      if (validBooks.length > 4) {
        container.innerHTML += `
          <div onclick="openBooksModal()" style="min-width: 120px; height: 200px; margin: 10px; border: 2px dashed #e50914; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; background: #121620; color: white; flex-shrink: 0;">
            <div style="background: #e50914; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 8px;">➔</div>
            <span style="font-weight: bold; font-size: 14px;">View All</span>
          </div>
        `;
      }

      // 4. फुल व्यू: सभी बुक्स लोड करना
      if (gridContainer) {
        validBooks.forEach(book => {
          gridContainer.innerHTML += createBookCard(book);
        });
      }
window.openBooksModal = function() {
  const modal = document.getElementById('booksModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
};

window.closeBooksModal = function() {
  const modal = document.getElementById('booksModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

