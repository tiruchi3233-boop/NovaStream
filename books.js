document.addEventListener("DOMContentLoaded", () => {
    // Inject Styles dynamically
    if (!document.getElementById("books-dynamic-styles")) {
        const style = document.createElement("style");
        style.id = "books-dynamic-styles";
        style.textContent = `
            .book-card {
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
            .book-card:hover {
                transform: scale(1.05);
                box-shadow: 0 8px 20px rgba(0, 123, 255, 0.4);
            }
            .book-card img {
                width: 100%;
                height: 250px;
                object-fit: cover;
                display: block;
            }
            .book-card-content {
                padding: 10px;
                text-align: center;
            }
            .book-card-title {
                color: #ffffff;
                font-size: 14px;
                font-weight: 600;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin: 0;
            }
            .badge-pdf {
                position: absolute;
                top: 8px;
                right: 8px;
                background-color: #007bff;
                color: #fff;
                font-size: 10px;
                font-weight: bold;
                padding: 2px 6px;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(style);
    }

    // Tab name set to 'books' (lowercase as in sheet)
    const booksSheetUrl = "https://opensheet.elk.sh/1KsW_umfHcm31DtoFuTcy5Z5t8Plq-0WhrlqY65cmcyo/books";
    const booksContainer = document.getElementById("books-container");

    if (booksContainer) {
        fetch(booksSheetUrl)
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(data => {
                booksContainer.innerHTML = "";
                if (data.length === 0) {
                    booksContainer.innerHTML = "<p>कोई Book उपलब्ध नहीं है।</p>";
                    return;
                }
                data.forEach(item => {
                    const title = item.title || "Untitled Book";
                    const poster = item.image || "https://via.placeholder.com/180x250?text=No+Cover";
                    const pdfLink = item.link || "#";

                    const card = document.createElement("div");
                    card.className = "book-card";
                    card.innerHTML = `
                        <span class="badge-pdf">PDF</span>
                        <img src="${poster}" alt="${title}" loading="lazy" onerror="this.src='https://via.placeholder.com/180x250?text=Image+Error'">
                        <div class="book-card-content">
                            <h4 class="book-card-title">${title}</h4>
                        </div>
                    `;

                    card.addEventListener("click", () => {
                        if (pdfLink !== "#") {
                            window.open(pdfLink, "_blank");
                        } else {
                            alert("इस किताब का लिंक उपलब्ध नहीं है।");
                        }
                    });

                    booksContainer.appendChild(card);
                });
            })
            .catch(error => {
                console.error("Error fetching books:", error);
                booksContainer.innerHTML = "<p>Books लोड नहीं हो सकीं। कृपया शेयरिंग सेटिंग्स और लिंक जांचें।</p>";
            });
    }
});

