document.addEventListener("DOMContentLoaded", () => {
    // Inject Styles dynamically
    if (!document.getElementById("movies-dynamic-styles")) {
        const style = document.createElement("style");
        style.id = "movies-dynamic-styles";
        style.textContent = `
            .movie-card {
                flex: 0 0 auto;
                width: 180px;
                background-color: #181818;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 10px rgba(0,0,0,0.5);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                cursor: pointer;
                position: relative;
            }
            .movie-card:hover {
                transform: scale(1.05);
                box-shadow: 0 8px 20px rgba(229, 9, 20, 0.4);
            }
            .movie-card img {
                width: 100%;
                height: 250px;
                object-fit: cover;
                display: block;
            }
            .movie-card-content {
                padding: 10px;
                text-align: center;
            }
            .movie-card-title {
                color: #ffffff;
                font-size: 14px;
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin: 0;
            }
            .badge-hd {
                position: absolute;
                top: 8px;
                right: 8px;
                background-color: #e50914;
                color: #fff;
                font-size: 10px;
                font-weight: bold;
                padding: 2px 6px;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(style);
    }

    const moviesSheetUrl = "https://opensheet.elk.sh/1ygQNR0MZ5npqvBYeNjXNFu4NPMIbZS330GLDTXgm3D4/Sheet1";
    const moviesContainer = document.getElementById("movies-container");

    if (moviesContainer) {
        fetch(moviesSheetUrl)
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(data => {
                moviesContainer.innerHTML = "";
                if (data.length === 0) {
                    moviesContainer.innerHTML = "<p>कोई Movie उपलब्ध नहीं है।</p>";
                    return;
                }
                data.forEach(item => {
                    const title = item.title || "Untitled Movie";
                    const poster = item.poster || "https://via.placeholder.com/180x250?text=No+Poster";
                    const videoLink = item.video || "#";

                    const card = document.createElement("div");
                    card.className = "movie-card";
                    card.innerHTML = `
                        <span class="badge-hd">4K HD</span>
                        <img src="${poster}" alt="${title}" loading="lazy" onerror="this.src='https://via.placeholder.com/180x250?text=Image+Error'">
                        <div class="movie-card-content">
                            <h4 class="movie-card-title">${title}</h4>
                        </div>
                    `;

                    card.addEventListener("click", () => {
                        if (videoLink !== "#") {
                            window.open(videoLink, "_blank");
                        } else {
                            alert("इस फिल्म का लिंक उपलब्ध नहीं है।");
                        }
                    });

                    moviesContainer.appendChild(card);
                });
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
                moviesContainer.innerHTML = "<p>Movies लोड नहीं हो सकीं। कृपया शेयरिंग सेटिंग्स और लिंक जांचें।</p>";
            });
    }
});



