// OpenSheet API URL for Books (Correct Sheet ID)
const BOOKS_API_URL = "https://opensheet.elk.sh/1KsW_umfHcm31DtoFuTcy5Z5t8Plq-0WhrlqY65cmcyo/books";

async function fetchBooks() {
  const container = document.getElementById("books-container");
  
  try {
    const response = await fetch(BOOKS_API_URL, { cache: "no-store" });
    
    // Logic Fix: अगर रिस्पॉन्स सही नहीं है (response.ok === false), तभी एरर कैच में भेजें
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    
    const books = await response.json();

    // अगर डाटा खाली आए
    if (!Array.isArray(books) || books.length === 0) {
      if (container) container.innerHTML = "<p>No books found.</p>";
      return;
    }
    
    // डाटा को सफलतापूर्वक HTML में रेंडर करें
    if (container) {
      container.innerHTML = books.map(book => {
        let coverImg = book.cover || book.Image || 'https://via.placeholder.com/150';
        let readLink = book.read_url || book.link || '#';

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
