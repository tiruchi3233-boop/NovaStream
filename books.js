// OpenSheet API URL for Books
const BOOKS_API_URL = "https://opensheet.elk.sh/1ygQNR0MZ5mpqvBYeNjXNFu4NPMIbZS330GLDTXgm3D4/books";

async function fetchBooks() {
  const container = document.getElementById("books-container");
  
  try {
    const response = await fetch(BOOKS_API_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const books = await response.json();

    if (!Array.isArray(books) || books.length === 0) {
      if (container) container.innerHTML = "<p>No books found.</p>";
      return;
    }
    
    if (container) {
      container.innerHTML = books.map(book => {
        // आपकी सीट में जो कॉलम के नाम हों (Image/cover या link/read_url)
        let coverImg = book.Image || book.cover || 'https://via.placeholder.com/150';
        let readLink = book.link || book.read_url || '#';

        return `
          <div class="book-card">
            <img src="${coverImg}" alt="${book.title || 'Book'}">
            <h3>${book.title || 'Untitled'}</h3>
            <a href="${readLink}" target="_blank" rel="noopener noreferrer">Read Now</a>
          </div>
        `;
      }).join('');
    }
  } catch (error) {
    console.error("Error loading books:", error);
    if (container) {
      container.innerHTML = "<p>Books could not be loaded.</p>";
    }
  }
}

document.addEventListener("DOMContentLoaded", fetchBooks);


