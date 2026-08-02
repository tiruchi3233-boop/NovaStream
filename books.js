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
    const container = document.getElementById('books-container');
    container.innerHTML = ''; // पुराना लोडिंग या एरर टेक्स्ट साफ करने के लिए

    data.forEach(book => {
      if (book.title) {
        const bookCard = `
          <div class="book-card">
            <img src="${book.cover}" alt="${book.title}">
            <h3>${book.title}</h3>
            <a href="${book.read_url}" target="_blank" class="btn">Read Now</a>
          </div>
        `;
        container.innerHTML += bookCard;
      }
    });
  })
  .catch(error => {
    console.error('Error fetching books:', error);
    document.getElementById('books-container').innerHTML = `<p>Error Details: ${error.message}</p>`;
  });
