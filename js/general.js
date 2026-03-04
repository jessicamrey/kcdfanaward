


import { quotes } from "./quotes-data.js";


// Read more quotes
const perPage = 3;
let currentPage = 1;

const container = document.getElementById("more-quotes-container");
const pagination = document.getElementById("quotes-pagination");
const pageSelect = document.getElementById("quotes-page-select");

function renderQuotes() {
  container.innerHTML = `
    <div class="row g-4 more-quotes-h">
      ${quotes
        .slice((currentPage - 1) * perPage, currentPage * perPage)
        .map(
          q => `
          <div class="col-12 col-md-4">
            <div class="quote-card h-100">
              <h3>${q.author}</h3>
              <p>${q.text}</p>
            </div>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

function renderPagination() {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(quotes.length / perPage);

  // left
  pagination.innerHTML += `
    <button ${currentPage === 1 ? "disabled" : ""} onclick="changePage(${currentPage - 1})">&lt;</button>
  `;

  const maxVisible = 3;
  let start = 1;
  let end = totalPages;

  if (totalPages > maxVisible) {

    if (currentPage <= 1) {
      start = 1;
      end = maxVisible;
    } 
    else if (currentPage >= totalPages - 1) {
      start = totalPages - (maxVisible - 1);
      end = totalPages;
    } 
    else {
      start = currentPage - 1;
      end = currentPage + 1;
    }

  }

  // dots left
  if (start > 1) {
    pagination.innerHTML += `<span class="dots">...</span>`;
  }

  for (let i = start; i <= end; i++) {
    pagination.innerHTML += `
      <button class="${i === currentPage ? "active" : ""}" onclick="changePage(${i})">
        ${i}
      </button>
    `;
  }

  // dots right
  if (end < totalPages) {
    pagination.innerHTML += `<span class="dots">...</span>`;
  }

  // next
  pagination.innerHTML += `
    <button ${currentPage === totalPages ? "disabled" : ""} onclick="changePage(${currentPage + 1})">&gt;</button>
  `;
}



window.changePage = function(page) {
  const totalPages = Math.ceil(quotes.length / perPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderQuotes();
  renderPagination();
};

renderQuotes();
renderPagination();



// Simple quotes
const containerSimple = document.getElementById("quotes-container" );

function renderQuotesSimple() {
  containerSimple.innerHTML = quotes
    .map(
      (q, index) => `
      <div class="quote-content ${index === 0 ? "active" : ""}">
        <blockquote>
          <strong>${q.text}</strong>
        </blockquote>
        <div class="quote-author">
          <span>${q.author}</span>
        </div>
      </div>
    `
    )
    .join("");
}

renderQuotesSimple();
initQuotesCarousel();


// carrousel 
function initQuotesCarousel() {
   const quotes = document.querySelectorAll('.quote-content');
   const prevBtn = document.querySelector('.quote-nav.left');
   const nextBtn = document.querySelector('.quote-nav.right');
   let currentIndex = 0;

   function showQuote(index, direction) {
      quotes.forEach(q => {
         q.classList.remove('active', 'slide-in-left', 'slide-in-right');
      });
      const activeQuote = quotes[index];
      activeQuote.classList.add('active');
      if (direction === 'next') {
         activeQuote.classList.add('slide-in-right');
      } else if (direction === 'prev') {
         activeQuote.classList.add('slide-in-left');
      }
   }
   prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
      showQuote(currentIndex, 'prev');
   });
   nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % quotes.length;
      showQuote(currentIndex, 'next');
   });
   showQuote(currentIndex, 'next');
}

document.addEventListener('DOMContentLoaded', function () {

  let translations = {};

  async function loadLanguage(lang) {
    const response = await fetch(`i18n/${lang}.json`);
    translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    updateReadMoreButtons();
  }

  const btn = document.getElementById('readMoreBtn');
  const hiddenContent = document.querySelector('.hidden-content');

  const readMoreQuotesBtn = document.getElementById("readMoreQuotesBtn");
  const moreQuotesSection = document.getElementById("more-quotes");

  function updateReadMoreButtons() {

    if (btn) {
      btn.textContent = hiddenContent.classList.contains("show")
        ? translations.read_less
        : translations.read_more;
    }

    if (readMoreQuotesBtn) {
      readMoreQuotesBtn.textContent = moreQuotesSection.classList.contains("show")
        ? translations.read_less
        : translations.read_more;
    }

  }

  // Intro Read more
  btn.addEventListener('click', function () {
    hiddenContent.classList.toggle('show');
    updateReadMoreButtons();
  });

  // Quotes Read more
  readMoreQuotesBtn.addEventListener("click", function () {
    moreQuotesSection.classList.toggle("show");
    updateReadMoreButtons();
  });

  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  sections.forEach(section => observer.observe(section));

  // language  
  const langButtons = document.querySelectorAll(".lang-btn");

  if (!langButtons.length) {
    console.error("No se encontraron botones de idioma");
    return;
  }

  function setActiveLang(lang) {
    langButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  langButtons.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const lang = btn.dataset.lang;
      loadLanguage(lang);
      setActiveLang(lang);
      localStorage.setItem("lang", lang);
    });
  });

  const savedLang = localStorage.getItem("lang");
  const browserLang = navigator.language.startsWith("cs") ? "cz" : "en";
  const initialLang = savedLang || browserLang;

  loadLanguage(initialLang);
  setActiveLang(initialLang);

});


  

