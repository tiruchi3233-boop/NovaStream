// OpenSheet API URL for Books
const BOOKS_API_URL = "https://opensheet.elk.sh/1ygQNR0MZ5mpqvBYeNjXNFu4NPMIbZS330GLDTXgm3D4/books";

async function fetchBooks() {
  const container = document.getElementById("books-container"); // अपने HTML कंटेनर की ID अनुसार बदलें
  
  try {
    const response = await fetch(BOOKS_API_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const books = await response.json();
    
    // HTML में कार्ड्स जनरेट करना
    if (container) {
      container.innerHTML = books.map(book => `
        <div class="book-card">
          <img src="${book.cover || book.poster}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p>${book.author || ''}</p>
          <a href="${book.read_url || book.link}" target="_blank">Read Book</a>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error("Error loading books:", error);
    if (container) {
      container.innerHTML = "<p>Books could not be loaded.</p>";
    }
  }
}

// पेज लोड होने पर फ़ंक्शन कॉल करें
document.addEventListener("DOMContentLoaded", fetchBooks);

