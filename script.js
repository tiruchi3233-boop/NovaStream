import { loadBooks } from './books.js';

// पेज लोड होते ही बुक्स लोड करें
document.addEventListener('DOMContentLoaded', () => {
  loadBooks();
});

// ==========================================
// 1. PDF Modal Functions (Global बनाए गए हैं)
// ==========================================
window.openPdfModal = function(url) {
  let modal = document.getElementById('pdf-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'pdf-modal';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.85); display: flex; justify-content: center;
      align-items: center; z-index: 9999; padding: 10px; box-sizing: border-box;
    `;
    modal.innerHTML = `
      <div style="position: relative; width: 100%; max-width: 800px; height: 90vh; background: #1a1a1a; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;">
        <button onclick="closePdfModal()" style="position: absolute; top: 10px; right: 15px; background: #ff4757; color: white; border: none; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-weight: bold; z-index: 10000;">✕ Close</button>
        <iframe id="pdf-frame" src="" width="100%" height="100%" style="border: none; margin-top: 40px;"></iframe>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  const embedUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;
  document.getElementById('pdf-frame').src = embedUrl;
  modal.style.display = 'flex';
};

window.closePdfModal = function() {
  const modal = document.getElementById('pdf-modal');
  if (modal) {
    modal.style.display = 'none';
    document.getElementById('pdf-frame').src = '';
  }
};

// ==========================================
// 2. Legal Notices & Policies (Global बनाए गए हैं)
// ==========================================
const legalData = {
  privacy: {
    title: "Privacy Policy",
    content: `
      <p>Welcome to our platform. Your privacy is important to us.</p>
      <h3>1. Information Collection</h3>
      <p>We do not collect personal identity information from users browsing our public content.</p>
      <h3>2. Content & Embedded Files</h3>
      <p>Our platform hosts and embeds downloadable and viewable digital resources (PDFs, media) strictly for educational and streaming purposes.</p>
      <h3>3. Cookies & Analytics</h3>
      <p>We may use basic browser storage/cookies to enhance user interface controls and stream delivery performance.</p>
      <h3>4. Contact Us</h3>
      <p>If you have any queries regarding this Privacy Policy, please email us directly through the Contact Us link.</p>
    `
  },
  terms: {
    title: "Terms of Use",
    content: `
      <p>By accessing and using this website, you agree to comply with the following terms:</p>
      <h3>1. Content Usage</h3>
      <p>All content made available on this website is intended solely for personal, non-commercial media viewing and reading.</p>
      <h3>2. Copyright & Intellectual Property</h3>
      <p>We respect intellectual property rights. Books and media served are intended to comply with fair-use guidelines or public domain availability.</p>
      <h3>3. Disclaimer of Liability</h3>
      <p>We provide services on an "AS IS" basis. We are not liable for any third-party link redirections or network connectivity issues during downloads/streaming.</p>
      <h3>4. Platform Updates</h3>
      <p>We reserve the right to modify services, terms, and features at any time without prior individual notice.</p>
    `
  }
};

window.openLegalModal = function(type) {
  const modal = document.getElementById('legal-modal');
  const title = document.getElementById('legal-title');
  const content = document.getElementById('legal-content');

  if (modal && legalData[type]) {
    title.innerText = legalData[type].title;
    content.innerHTML = legalData[type].content;
    modal.style.display = 'flex';
  }
};

window.closeLegalModal = function() {
  const modal = document.getElementById('legal-modal');
  if (modal) {
    modal.style.display = 'none';
  }
};

// ==========================================
// 3. Movies और Books दोनों के लिए ड्रॉपडाउन लाइव सर्च
// ==========================================
const searchInput = document.getElementById('searchInput');
const searchDropdown = document.getElementById('searchDropdown');

if (searchInput && searchDropdown) {
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase().trim();

    if (query === '') {
      searchDropdown.style.display = 'none';
      searchDropdown.innerHTML = '';
      return;
    }

    searchDropdown.innerHTML = '';
    let matchesFound = 0;
    const seenTitles = new Set();

    const allCards = document.querySelectorAll('.book-card, .movie-card, #movies-container > div, #books-container > div, #all-books-grid > div, #all-movies-grid > div, #allMoviesModal .movie-card');

    allCards.forEach(card => {
      const titleEl = card.querySelector('.movie-title, .book-title, h3, h4');
      const titleText = titleEl ? titleEl.innerText.trim() : '';

      if (titleText.toLowerCase().includes(query) && !seenTitles.has(titleText.toLowerCase())) {
        seenTitles.add(titleText.toLowerCase());
        matchesFound++;

        const img = card.querySelector('img');
        const imgSrc = img ? img.src : '';
        const btn = card.querySelector('button');
        const link = card.querySelector('a');

        const item = document.createElement('div');
        item.style.cssText = `
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-bottom: 1px solid #1e293b;
          cursor: pointer;
        `;
        item.onmouseover = () => item.style.backgroundColor = '#1e293b';
        item.onmouseout = () => item.style.backgroundColor = 'transparent';

        item.innerHTML = `
          ${imgSrc ? `<img src="${imgSrc}" style="width: 35px; height: 50px; object-fit: cover; border-radius: 4px;">` : ''}
          <div style="flex: 1; text-align: left;">
            <div style="color: #fff; font-size: 13px; font-weight: 500;">${titleText}</div>
            <span style="color: #38bdf8; font-size: 11px;">Watch / Read Now</span>
          </div>
        `;

        item.addEventListener('click', () => {
          if (btn) {
            btn.click();
          } else if (link && link.href) {
            window.open(link.href, '_blank');
          }
          searchDropdown.style.display = 'none';
        });

        searchDropdown.appendChild(item);
      }
    });

    if (matchesFound === 0) {
      searchDropdown.innerHTML = `
        <div style="padding: 12px; text-align: center; color: #94a3b8; font-size: 13px;">
          ❌ No results found for "<b>${e.target.value}</b>"
        </div>
      `;
    }

    searchDropdown.style.display = 'block';
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.style.display = 'none';
    }
  });
}

// ==========================================
// Expandable Search Bar Logic
// ==========================================
const searchTriggerBtn = document.getElementById('searchTriggerBtn');
const searchContainer = document.getElementById('searchContainer');
const searchInputEl = document.getElementById('searchInput'); 
const clearSearchBtn = document.getElementById('clearSearchBtn');
const searchDropdownEl = document.getElementById('searchDropdown');

// 1. आइकॉन पर क्लिक करने पर सर्च बॉक्स खोलना
if (searchTriggerBtn && searchContainer) {
  searchTriggerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    searchContainer.classList.add('active');
    searchInputEl.focus(); 
    searchTriggerBtn.style.display = 'none'; 
  });
}

// 2. जब कुछ टाइप हो, तो Clear (X) बटन दिखाना
if (searchInputEl && clearSearchBtn) {
  searchInputEl.addEventListener('input', () => {
    if (searchInputEl.value.length > 0) {
      clearSearchBtn.style.display = 'block';
    } else {
      clearSearchBtn.style.display = 'none';
    }
  });
}

// 3. Clear (X) बटन पर क्लिक करने पर टेक्स्ट डिलीट करना
if (clearSearchBtn) {
  clearSearchBtn.addEventListener('click', () => {
    searchInputEl.value = ''; 
    clearSearchBtn.style.display = 'none'; 
    searchInputEl.focus(); 
    
    if (searchDropdownEl) {
       searchDropdownEl.style.display = 'none';
       searchDropdownEl.innerHTML = '';
    }
  });
}

// 4. सर्च बॉक्स के बाहर कहीं भी क्लिक करने पर उसे बंद करना
document.addEventListener('click', (e) => {
  if (searchContainer && searchTriggerBtn) {
    if (!searchContainer.contains(e.target) && !searchDropdownEl.contains(e.target)) {
      searchContainer.classList.remove('active');
      searchTriggerBtn.style.display = 'block'; 
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (!menuToggle || !navMenu) return;

  const mobileStyles = document.createElement("style");
  mobileStyles.innerHTML = `
      @media (max-width: 768px) {
          .nav-menu:not(.mobile-active) {
              display: none !important;
          }
          
          .nav-menu.mobile-active {
              display: flex !important;
              flex-direction: column !important;
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              width: 65% !important;
              height: 100vh !important;
              background-color: #0a0a0f !important;
              padding: 80px 20px 30px !important;
              gap: 25px !important;
              box-shadow: 10px 0px 30px rgba(0,0,0,0.8) !important;
              z-index: 9999 !important;
          }
          
          .nav-menu.mobile-active a {
              font-size: 16px !important;
              display: block !important;
              padding-bottom: 15px !important;
              border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
              width: 100% !important;
              color: #ffffff !important;
              text-decoration: none !important;
          }
      }
  `;
  document.head.appendChild(mobileStyles);

  menuToggle.addEventListener("change", (e) => {
      e.target.checked 
          ? navMenu.classList.add("mobile-active") 
          : navMenu.classList.remove("mobile-active");
  });

  navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
          menuToggle.checked = false;
          navMenu.classList.remove("mobile-active");
      });
  });
});

// --- Books Modal Open/Close Logic ---
document.addEventListener('click', function (e) {
  if (e.target.closest('#openBooksBtn')) {
    const modal = document.getElementById('booksModal');
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  window.closeBooksModal = function() {
    const modal = document.getElementById('booksModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };
});
// ==========================================
// Bottom Navigation & View Switcher (Fixed)
// ==========================================

window.switchTab = function(tabName, pushToHistory = true) {
  const tabs = ['home', 'movies', 'books', 'games', 'shopping'];
  const buttons = document.querySelectorAll('#bottomNav .nav-tab-btn');

  // 1. एक्टिव टैब का नीला रंग सेट करना
  buttons.forEach((btn, index) => {
    if (tabs[index] === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 2. आपकी HTML के असली सेक्शन्स को पकड़ना
  const heroSection = document.querySelector('.hero-section');
  const moviesSection = document.getElementById('movies-container')?.closest('.section');
  const booksSection = document.getElementById('books-container')?.closest('.section');
  const gamesSection = document.getElementById('games-section');
  const topBackBtn = document.getElementById('topBackBtn');

  // शॉपिंग सेक्शन (अगर नहीं बना है तो अपने आप तैयार करना)
  let shoppingSection = document.getElementById('shopping-section');
  if (!shoppingSection && tabName === 'shopping') {
    shoppingSection = document.createElement('div');
    shoppingSection.id = 'shopping-section';
    shoppingSection.className = 'section';
    shoppingSection.style.cssText = 'text-align: center; padding: 60px 20px; color: #94a3b8;';
    shoppingSection.innerHTML = '<h2 style="color: #38bdf8; font-size: 24px; margin-bottom: 8px;">🛍️ Shopping Store</h2><p>Exclusive merchandise & products coming soon!</p>';
    const footer = document.querySelector('footer');
    if (footer) footer.parentNode.insertBefore(shoppingSection, footer);
  }

  // 3. टैब के अनुसार सेक्शन दिखाना और बाकी को छुपाना
  if (tabName === 'home') {
    // होम पर सब कुछ दिखेगा
    if (heroSection) heroSection.style.display = 'block';
    if (moviesSection) moviesSection.style.display = 'block';
    if (booksSection) booksSection.style.display = 'block';
    if (gamesSection) gamesSection.style.display = 'block';
    if (shoppingSection) shoppingSection.style.display = 'none';
    if (topBackBtn) topBackBtn.style.display = 'none'; // होम पर बैक बटन छिपा रहेगा
  } else {
    // किसी खास टैब पर सिर्फ वही सेक्शन दिखेगा
    if (heroSection) heroSection.style.display = 'none';
    if (moviesSection) moviesSection.style.display = (tabName === 'movies') ? 'block' : 'none';
    if (booksSection) booksSection.style.display = (tabName === 'books') ? 'block' : 'none';
    if (gamesSection) gamesSection.style.display = (tabName === 'games') ? 'block' : 'none';
    if (shoppingSection) shoppingSection.style.display = (tabName === 'shopping') ? 'block' : 'none';
    if (topBackBtn) topBackBtn.style.display = 'inline-block'; // बाकी टैब्स पर बैक बटन (←) दिखेगा
  }

  // 4. हिस्ट्री में जोड़ना (ताकि मोबाइल बैक बटन काम करे)
  if (pushToHistory) {
    history.pushState({ activeTab: tabName }, '', `#${tabName}`);
  }

  // उस सेक्शन के टॉप पर ले जाना
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// फ़ोन का बैक बटन दबाने पर हैंडल करना
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.activeTab) {
    switchTab(e.state.activeTab, false);
  } else {
    switchTab('home', false);
  }
});

// पेज लोड होते ही डिफ़ॉल्ट होम सेट करना
document.addEventListener('DOMContentLoaded', () => {
  history.replaceState({ activeTab: 'home' }, '', '#home');
});
