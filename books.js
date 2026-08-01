const BOOKS_URL = 'https://opensheet.elk.sh/1KsW_umfHcm31DtoFuTcy5Z5t8Plq-0WhrlqY65cmcyo/Sheet1';

async function loadBooks() {
    const container = document.getElementById('books-container');
    if (!container) return;

    try {
        const res = await fetch(BOOKS_URL);
        const data = await res.json();

        container.innerHTML = '';
        data.forEach(item => {
            const title = item.Title || item.title || 'Untitled Book';
            const img = item.Image || item.image || item.poster || '';
            const link = item.Link || item.link || '#';

            container.innerHTML += `
                <a href="${link}" target="_blank" style="text-decoration: none; color: inherit; display: inline-block; margin-right: 12px; vertical-align: top;">
                    <div style="position: relative; width: 130px; height: 180px; border-radius: 6px; overflow: hidden; background: #181818; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                        <img src="${img}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                        <span style="position: absolute; top: 6px; right: 6px; background-color: #007bff; color: #ffffff; font-size: 9px; font-weight: bold; padding: 2px 5px; border-radius: 3px; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.6); text-transform: uppercase;">PDF</span>
                    </div>
                    <div style="color: #ffffff; font-size: 12px; font-weight: 500; margin-top: 6px; width: 130px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left;">${title}</div>
                </a>
            `;
        });
    } catch (err) {
        console.error(err);
        container.innerHTML = '<p style="color: #ffffff;">Books लोड नहीं हो सकीं</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadBooks);
