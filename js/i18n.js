async function loadLanguage(lang) {
  const response = await fetch(`i18n/${lang}.json`);
  const translations = await response.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
}

const userLang = navigator.language.startsWith("cz") ? "cz" : "en";
loadLanguage(userLang);