const sheetId = '1KsW_umfHcm31DtoFuTcy5Z5t8Plq-0WhrlqY65cmcyo';
// OpenSheet API (जो Google Sheet को डायरेक्ट साफ़ JSON में बदलती है)
const url = `https://opensheet.elk.sh/${sheetId}/1`;

async function fetchBooks() {
  const container = document.getElementById('books-container');

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const books = await response.json();

    if (!Array.isArray(books) || books.length === 0) {
      if (container) container.innerHTML = "<p>Sheet खाली है या डाटा नहीं मिला।</p>";
      return;
    }

    if (container) {
      container.innerHTML = books.map(book => {
        // यहाँ आपकी Sheet की Headers के नाम आ जाएँगे
        // अगर आपकी शीट में Column नाम Title, Image, Link हैं:
        const title = book.Title || book.title || book.Name || 'Untitled';
        const coverImg = book.Image || book.image || book.Cover || 'https://via.placeholder.com/150';
        const readLink = book.Link || book.link || book.URL || '#';

        return `
          <div class="book-card">
            <img src="${coverImg}" alt="${title}">
            <h3>${title}</h3>
            <a href="${readLink}" target="_blank" rel="noopener noreferrer">Read Now</a>
          </div>
        `;
      }).join('');
    }

  } catch (error) {
    // स्क्रीन पर असली एरर दिखेगा
    if (container) {
      container.innerHTML = `<p style="color:red;">Error Details: ${error.message}</p>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', fetchBooks);
