// Color mode
const lightStyles = document.querySelectorAll('link[rel=stylesheet][data-theme="light"]');
const darkStyles = document.querySelectorAll('link[rel=stylesheet][data-theme="dark"]');

const setupToggle = () => {
  const themesRevert = {
    light: 'dark',
    dark: 'light'
  };
  const savedScheme = getSavedScheme();
  const themeToggle = document.querySelector('.theme-toggle');

  if (savedScheme !== null) {
    themeToggle.dataset.mode = themesRevert[savedScheme];
  }

  themeToggle.addEventListener('click', (event) => {
    const themeToggle = event.target.closest('.theme-toggle');
    const themeToSet = themeToggle.dataset.mode;

    setScheme(themeToSet);
    themeToggle.dataset.mode = themesRevert[themeToSet];
    setupPriceButtons();
  });
};

const setupPriceButtons = () => {
  const priceButtons = document.querySelectorAll('.price-card__button');
  const themeToSet = document.querySelector('.theme-toggle').dataset.mode;

  [...priceButtons].forEach((btn) => {
    if (themeToSet === 'dark') {
      btn.classList.add('button--outline');
    } else {
      btn.classList.remove('button--outline');
    }
  });
};

const setupScheme = () => {
  const savedScheme = getSavedScheme();

  if (savedScheme === null) return;

  setScheme(savedScheme);
};

function setScheme(scheme) {
  switchMedia(scheme);
  saveScheme(scheme);
}

function switchMedia(scheme) {
  [...lightStyles].forEach((link) => {
    link.media = (scheme === 'light') ? 'all' : 'not all';;
  });

  [...darkStyles].forEach((link) => {
    link.media = (scheme === 'dark') ? 'all' : 'not all';;
  });
}

function getSavedScheme() {
  return localStorage.getItem('color-scheme');
}

function saveScheme(scheme) {
  localStorage.setItem('color-scheme', scheme);
}

setupScheme();

document.addEventListener('DOMContentLoaded', () => {
  setupToggle();
  setupPriceButtons();
});
