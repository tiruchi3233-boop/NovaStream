const BOOKS_URL = 'https://opensheet.elk.sh/1KsW_umfHcm31DtoFuTcy5Z5t8Plq-0WhrlqY65cmcyo/Sheet1';

async function loadBooks() {
    const container = document.getElementById('books-container');
    try {
        const res = await fetch(BOOKS_URL);
        const data = await res.json();
        
        container.innerHTML = '';
        data.forEach(item => {
            const title = item.Title || item.title || 'Untitled';
            const img = item.Image || item.image || '';
            const link = item.Link || item.link || item.pdf || '#';

            container.innerHTML += `
                <a href="${link}" target="_blank" class="card-link">
                    <div class="card">
                        <img src="${img}" alt="${title}">
                        <div class="card-details">
                            <span class="badge badge-pdf">PDF</span>
                            <div class="card-title">${title}</div>
                        </div>
                    </div>
                </a>`;
        });
    } catch (err) {
        container.innerHTML = '<p>Books लोड नहीं हो सकीं</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadBooks);
