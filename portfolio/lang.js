// i18n
import i18nObj from './i18n/translate.js';

const DEFAULT_LANG = 'en';

const getTranslate = (lang) => {
  const elemsToTranslate = document.querySelectorAll('[data-i18n]');

  elemsToTranslate.forEach((elem) => {
    if (i18nObj[lang][elem.dataset.i18n]) {
      const newText = i18nObj[lang][elem.dataset.i18n];

      if (elem.dataset.i18n.startsWith('multiline-')) {
        elem.textContent = '';

        newText.split('\n').forEach((line) => {
          if (line.trim()) {
            elem.append(line.trim(), document.createElement('br'));
          }
        })
      } else {
        elem.textContent = newText;
      }

      if (elem.placeholder) {
        elem.placeholder = newText;
        elem.textContent = '';
      }
    }
  });
};

const changeLang = (lang) => {
  saveLang(lang);
  getTranslate(lang);
  document.documentElement.lang = lang;
};

const setupLangButtons = (lang) => {
  const langBtns = document.querySelectorAll('.switch-lang__button');
  const langBtn = document.querySelector(`.switch-lang__button[data-lang="${lang}"]`);

  langBtns.forEach((btn) => {
    btn.classList.remove('switch-lang__button--active');
  });

  langBtn.classList.add('switch-lang__button--active');
};

const switchLang = (event) => {
  if (event.target.matches('.switch-lang__button:not(.switch-lang__button--active)')) {
    const targetLang = event.target.dataset.lang;

    setupLangButtons(targetLang);
    changeLang(targetLang);
  }
};

const setupLang = () => {
  const savedLang = getSavedLang();
  setupLangButtons(savedLang || document.documentElement.lang);

  if (savedLang !== null && savedLang !== document.documentElement.lang) {
    changeLang(savedLang);
  }

  document.documentElement.classList.remove('translating');
};

function getSavedLang() {
  return localStorage.getItem('lang');
}

function saveLang(lang) {
  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  setupLang();

  const switchLangElement = document.querySelector('.switch-lang');
  switchLangElement.addEventListener('click', switchLang);
});
