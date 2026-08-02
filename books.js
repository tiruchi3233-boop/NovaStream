// Google Sheet ID
const sheetId = '1KsW_umfHcm31DtoFuTcy5Z5t8Plq-0WhrlqY65cmcyo';

// Direct Google GViz JSON Endpoint
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

async function fetchBooks() {
  const container = document.getElementById('books-container');

  try {
    const response = await fetch(url);
    const textData = await response.text();

    // Clean Google's JSON wrapper
    const jsonString = textData.substring(47, textData.length - 2);
    const json = JSON.parse(jsonString);
    const rows = json.table.rows;

    if (!rows || rows.length === 0) {
      if (container) container.innerHTML = "<p>No books found.</p>";
      return;
    }

    if (container) {
      container.innerHTML = rows.map(row => {
        // Col A (0) = Title, Col B (1) = Image Link, Col C (2) = Read Link
        const title = row.c && row.c[0] ? row.c[0].v : 'Untitled';
        const coverImg = row.c && row.c[1] ? row.c[1].v : 'https://via.placeholder.com/150';
        const readLink = row.c && row.c[2] ? row.c[2].v : '#';

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
    console.error("Error loading books:", error);
    if (container) {
      container.innerHTML = "<p>Books could not be loaded.</p>";
    }
  }
}

document.addEventListener('DOMContentLoaded', fetchBooks);

