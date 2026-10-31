// इनबिल्ट गेम्स का कोड (बिना किसी नई फ़ाइल या एरर के सीधे मोडल में चलेंगे)
const builtInGames = {
  snake: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"><style>body{margin:0;background:#0f172a;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;overflow:hidden;}#score{font-size:18px;margin-bottom:8px;color:#fbbf24;}canvas{background:#000;border:2px solid #3b82f6;border-radius:8px;max-width:90vw;max-height:50vh;}.ctrls{display:grid;grid-template-columns:repeat(3,55px);gap:8px;margin-top:12px;}.btn{background:#1e293b;color:#fff;border:1px solid #475569;border-radius:8px;height:48px;font-size:20px;display:flex;align-items:center;justify-content:center;cursor:pointer;-webkit-tap-highlight-color:transparent;}.btn:active{background:#3b82f6;}</style></head><body><div id="score">Score: 0</div><canvas id="c" width="280" height="280"></canvas><div class="ctrls"><div></div><div class="btn" onclick="d='UP'">⬆️</div><div></div><div class="btn" onclick="d='LEFT'">⬅️</div><div class="btn" onclick="d='DOWN'">⬇️</div><div class="btn" onclick="d='RIGHT'">➡️</div></div><script>const c=document.getElementById("c"),x=c.getContext("2d"),b=14;let s=[{x:7*b,y:7*b}],f={x:3*b,y:3*b},d="RIGHT",sc=0;function g(){let h={...s[0]};if(d=="LEFT")h.x-=b;if(d=="UP")h.y-=b;if(d=="RIGHT")h.x+=b;if(d=="DOWN")h.y+=b;if(h.x<0||h.x>=c.width||h.y<0||h.y>=c.height||s.some(p=>p.x===h.x&&p.y===h.y)){alert("Game Over! Score: "+sc);s=[{x:7*b,y:7*b}];d="RIGHT";sc=0;document.getElementById("score").innerText="Score: "+sc;return;}s.unshift(h);if(h.x===f.x&&h.y===f.y){sc++;document.getElementById("score").innerText="Score: "+sc;f={x:Math.floor(Math.random()*19)*b,y:Math.floor(Math.random()*19)*b};}else s.pop();x.fillStyle="#020617";x.fillRect(0,0,c.width,c.height);x.fillStyle="#ef4444";x.fillRect(f.x,f.y,b,b);s.forEach((p,i)=>{x.fillStyle=i===0?"#22c55e":"#86efac";x.fillRect(p.x,p.y,b-1,b-1);});}setInterval(g,130);<\/script></body></html>`,

  tictactoe: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{margin:0;background:#0f172a;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;}h2{margin:0 0 15px;color:#fbbf24;}#board{display:grid;grid-template-columns:repeat(3,75px);grid-gap:8px;}.cell{width:75px;height:75px;background:#1e293b;border-radius:10px;border:2px solid #334155;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:bold;cursor:pointer;color:#38bdf8;}#status{margin-top:15px;font-size:16px;}button{margin-top:15px;background:#e50914;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head><body><h2>Tic-Tac-Toe</h2><div id="board"></div><div id="status">Turn: X</div><button onclick="rst()">Reset Game</button><script>let b=Array(9).fill(""),t="X",o=false;const board=document.getElementById("board"),st=document.getElementById("status");function ren(){board.innerHTML=b.map((v,i)=>'<div class="cell" onclick="c('+i+')">'+v+'</div>').join("");}function c(i){if(b[i]||o)return;b[i]=t;let w=chk();if(w){st.innerText=w==="T"?"Draw!":"Winner: "+w;o=true;}else{t=t==="X"?"O":"X";st.innerText="Turn: "+t;}ren();}function chk(){const w=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(let p of w){if(b[p[0]]&&b[p[0]]===b[p[1]]&&b[p[0]]===b[p[2]])return b[p[0]];}return b.includes("")?null:"T";}function rst(){b=Array(9).fill("");t="X";o=false;st.innerText="Turn: X";ren();}ren();<\/script></body></html>`,

  memory: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{margin:0;background:#0f172a;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;}h2{margin:0 0 10px;color:#fbbf24;}#grid{display:grid;grid-template-columns:repeat(4,65px);gap:10px;}.card{width:65px;height:65px;background:#1e293b;border:2px solid #3b82f6;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:26px;cursor:pointer;user-select:none;}</style></head><body><h2>Memory Match</h2><div id="grid"></div><script>const em=["🍎","🍌","🍇","🍓","🍒","🍍","🥝","🍉"];let cards=[...em,...em].sort(()=>Math.random()-0.5),sel=[],mat=[];const g=document.getElementById("grid");function d(){g.innerHTML=cards.map((e,i)=>'<div class="card" onclick="f('+i+')">'+(sel.includes(i)||mat.includes(i)?e:"❓")+'</div>').join("");}function f(i){if(sel.length===2||sel.includes(i)||mat.includes(i))return;sel.push(i);d();if(sel.length===2){let[a,b]=sel;if(cards[a]===cards[b]){mat.push(a,b);sel=[];d();if(mat.length===cards.length)alert("शानदार! आप जीत गए!");}else{setTimeout(()=>{sel=[];d();},700);}}}d();<\/script></body></html>`
};

async function loadGames() {
  const container = document.getElementById("games-container");
  if (!container) return;

  try {
    const res = await fetch("games.json?ts=" + Date.now());
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

function openGame(url) {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("gameIframe");
  if (!modal || !iframe) return;

  if (url.startsWith("internal:")) {
    const key = url.replace("internal:", "");
    iframe.removeAttribute("src");
    iframe.srcdoc = builtInGames[key] || "<h2>Game not found</h2>";
  } else {
    iframe.removeAttribute("srcdoc");
    iframe.src = url;
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeGame() {
  const modal = document.getElementById("gameModal");
  const iframe = document.getElementById("gameIframe");
  if (!modal || !iframe) return;

  iframe.src = "";
  iframe.removeAttribute("srcdoc");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

document.addEventListener("DOMContentLoaded", loadGames);


