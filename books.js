const sheetId = '1KsW_umfHcm31DtoFuTcy5Z5t8Plq-0WhrlqY65cmcyo';
const url = `https://opensheet.elk.sh/${sheetId}/1`;

async function fetchBooks() {
  const container = document.getElementById('books-container');

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const books = await response.json();

    if (!Array.isArray(books) || books.length === 0) {
      if (container) container.innerHTML = "<p>No books found.</p>";
      return;
    }

    if (container) {
      container.innerHTML = books.map(book => {
        const title = book.title || 'Untitled';
        const coverImg = book.cover || 'https://via.placeholder.com/150';
        
        // Link format check
        let readLink = book.read_url || '#';
        if (readLink !== '#' && !readLink.startsWith('http')) {
          readLink = 'https://' + readLink;
        }

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
    if (container) {
      container.innerHTML = `<p style="color:red;">Error Details: ${error.message}</p>`;
    }
  }
}

document.addEventListener('DOMContentLoaded', fetchBooks);
