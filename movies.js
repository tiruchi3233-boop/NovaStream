// ऑटोमैटिक CSS फ्रेश लोड (Dynamic Cache Buster)
(function() {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'style.css?v=' + Date.now();
    document.head.appendChild(link);
})();
const MOVIES_URL = 'https://opensheet.elk.sh/1ygQNR0MZ5mpqvBYeNjXNFu4NPMIbZS330GLDTXgm3D4/Sheet1';

async function loadMovies() {
    const container = document.getElementById('movies-container');
    try {
        const res = await fetch(MOVIES_URL);
        const data = await res.json();
        
        container.innerHTML = '';
        data.forEach(item => {
            const title = item.Title || item.title || 'Untitled';
            const img = item.Image || item.image || item.poster || '';
            const link = item.Link || item.link || item.video || '#';

            container.innerHTML += `
                <a href="${link}" target="_blank" class="card-link">
                    <div class="card">
                        <img src="${img}" alt="${title}">
                        <div class="card-details">
                            <span class="badge">4K HD</span>
                            <div class="card-title">${title}</div>
                        </div>
                    </div>
                </a>`;
        });
    } catch (err) {
        container.innerHTML = '<p>Movies लोड नहीं हो सकीं</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadMovies);
