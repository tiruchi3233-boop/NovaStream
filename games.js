// games.json से गेम्स लोड करना और कार्ड बनाना
async function loadGames() {
  const container = document.getElementById("games-container");
  if (!container) return;

  try {
    const res = await fetch("games.json");
    const games = await res.json();

    container.innerHTML = games.map(game => `
      <div class="card" style="min-width: 150px; max-width: 150px; background: #111827; border-radius: 10px; overflow: hidden; border: 1px solid #1f2937; text-align: center; padding-bottom: 12px; flex-shrink: 0;">
        <img src="${game.image}" style="width: 100%; height: 150px; object-fit: cover;" alt="${game.title}" loading="lazy">
        <h4 style="color: #fff; margin: 8px 4px 6px; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${game.title}</h4>
        <button onclick="openGame('${game.url}')" style="background: #e50914; color: #fff; border: none; padding: 5px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; cursor: pointer;">PLAY NOW</button>
      </div>
    `).join("");
  } catch (error) {
    console.log("Games load error:", error);
  }
}

// गेम प्लेयर मोडल खोलना
function openGame(url) {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("gameIframe");
  if (!modal || !iframe) return;

  iframe.src = url;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// गेम बंद करना
function closeGame() {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("gameIframe");
  if (!modal || !iframe) return;

  iframe.src = "";
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

document.addEventListener("DOMContentLoaded", loadGames);

