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

            data.forEach((book, index) => {
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
              <a href="https://docs.google.com/viewer?url=${encodeURIComponent(book.read_url)}" target="_blank" class="watch-now-btn" style="margin-right: 5px; text-decoration: none; display: inline-block;">
  📖 Read Online
</a>
            

              <!-- 2. डायरेक्ट डाउनलोड बटन -->
              <a href="${book.read_url}" download class="watch-now-btn" style="text-decoration: none;">
                📥 Download
              </a>
            </div>
          `;
                    // 4 किताबों तक होमपेज पर जाएगा
          if (index < 4) {
            container.innerHTML += bookCard;
          }
          // 4 किताबें पूरी होते ही View All बटन जुड़ जाएगा
          if (index === 4) {
            container.innerHTML += `
              <div id="openBooksBtn" style="min-width: 120px; height: 200px; margin: 10px; border: 2px dashed #e50914; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; background: #121620; color: white; flex-shrink: 0;">
                <div style="background: #e50914; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 8px;">➔</div>
                <span style="font-weight: bold; font-size: 14px;">View All</span>
              </div>
            `;
          }
          // ग्रिड वाले मोडल में सारी किताबें जुड़ती जाएँगी
          const grid = document.getElementById('all-books-grid');
          if (grid) grid.innerHTML += bookCard;

        }
      });
    })
    .catch(error => console.error('Error fetching books:', error));
}

