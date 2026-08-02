const sheetId = '1KsW_umfHcm31DtoFuTcy5Z5t8Plq-0WhrlqY65cmcyo';
const url = `https://opensheet.elk.sh/${sheetId}/Books`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Data received from sheet:", data); // ब्राउज़र कंसोल में चेक करने के लिए
    const container = document.getElementById('books-container');
    container.innerHTML = '';

    data.forEach(book => {
      if (book.title) {
        const bookCard = `
          <div class="book-card" style="min-width: 150px; margin: 10px; text-align: center; color: white;">
            <img src="${book.cover}" alt="${book.title}" style="width: 100px; height: 150px; object-fit: cover; border-radius: 6px;">
            <h4 style="margin: 8px 0; font-size: 14px;">${book.title}</h4>
            <a href="${book.read_url}" target="_blank" style="color: #00d2ff; text-decoration: none; font-size: 12px;">Read PDF</a>
          </div>
        `;
        container.innerHTML += bookCard;
      }
    });
  })
  .catch(error => {
    console.error('Error fetching books:', error);
    document.getElementById('books-container').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  });
// --- Live Search Functionality for Books ---
const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const bookCards = document.querySelectorAll('#books-container .card'); // आपके कार्ड की क्लास
    let hasResults = false;

    bookCards.forEach(card => {
      const title = card.innerText.toLowerCase();
      
      if (title.includes(searchTerm)) {
        card.style.display = 'block';
        hasResults = true;
      } else {
        card.style.display = 'none';
      }
    });

    // "Not Found" मैसेज दिखाने के लिए
    let noResultMsg = document.getElementById('no-books-found');
    if (!hasResults && searchTerm !== '') {
      if (!noResultMsg) {
        noResultMsg = document.createElement('p');
        noResultMsg.id = 'no-books-found';
        noResultMsg.style.color = '#94a3b8';
        noResultMsg.style.padding = '10px';
        noResultMsg.innerText = 'No matching books found.';
        document.getElementById('books-container').appendChild(noResultMsg);
      }
    } else if (noResultMsg) {
      noResultMsg.remove();
    }
  });
}

