


import { quotes } from "./quotes-data.js";


// Read more quotes
const perPage = 3;
let currentPage = 1;

const container = document.getElementById("more-quotes-container");
const pagination = document.getElementById("quotes-pagination");

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

  pagination.innerHTML += `<button onclick="changePage(${currentPage - 1})">&lt;</button>`;

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <button class="${i === currentPage ? "active" : ""}" onclick="changePage(${i})">
        ${i}
      </button>
    `;
  }

  pagination.innerHTML += `<button onclick="changePage(${currentPage + 1})">&gt;</button>`;
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
	
  const btn = document.getElementById('readMoreBtn');
  const hiddenContent = document.querySelector('.hidden-content');
  

  //Intro Read more
  btn.addEventListener('click', function () {
    hiddenContent.classList.toggle('show');

    this.textContent = hiddenContent.classList.contains('show')
      ? 'READ LESS'
      : 'READ MORE';
  });
  
    const readMoreQuotesBtn = document.getElementById("readMoreQuotesBtn");
  const moreQuotesSection = document.getElementById("more-quotes");

  readMoreQuotesBtn.addEventListener("click", function () {
    moreQuotesSection.classList.toggle("show");

    this.textContent = moreQuotesSection.classList.contains("show")
      ? "READ LESS"
      : "READ MORE";
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
  
  
	//language  
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
	// end language
  
});



  

