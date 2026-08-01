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
                <a href="${link}" target="_blank" style="text-decoration: none; color: inherit; display: inline-block; margin-right: 12px; vertical-align: top;">
                    <div style="position: relative; width: 130px; height: 180px; border-radius: 6px; overflow: hidden; background: #181818; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                        <img src="${img}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                        <span style="position: absolute; top: 6px; right: 6px; background-color: #e50914; color: #ffffff; font-size: 9px; font-weight: bold; padding: 2px 5px; border-radius: 3px; z-index: 10; box-shadow: 0 2px 4px rgba(0,0,0,0.6); text-transform: uppercase;">4K HD</span>
                    </div>
                    <div style="color: #ffffff; font-size: 12px; font-weight: 500; margin-top: 6px; width: 130px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left;">${title}</div>
                </a>
            `;

        container.innerHTML = '<p>Movies लोड नहीं हो सकीं</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadMovies);
