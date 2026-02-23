document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('readMoreBtn');
  const hiddenContent = document.querySelector('.hidden-content');

  btn.addEventListener('click', function () {
    hiddenContent.classList.toggle('show');

    this.textContent = hiddenContent.classList.contains('show')
      ? 'READ LESS'
      : 'READ MORE';
  });
});


/* read more dark theme

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('readMoreBtn');
  const hidden = document.querySelector('.hidden-content');
  const overlay = document.querySelector('.intro-overlay');

  if (!btn || !hidden || !overlay) return;

  btn.addEventListener('click', () => {
    const expanded = hidden.classList.toggle('show');

    overlay.classList.toggle('is-expanded', expanded);

    btn.textContent = expanded ? 'Leer menos' : 'Leer más';
  });
});*/