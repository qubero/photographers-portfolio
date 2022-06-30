(() => {
  // Menu Toggle
  const body = document.querySelector('body');
  const menu = document.querySelector('.menu');
  const toggle = document.querySelector('.toggle');
  const overlay = document.querySelector('.header__overlay');

  let currentScrollY = 0;

  const openMenu = () => {
    currentScrollY = window.pageYOffset;
    body.classList.add('fixed');
    body.style.marginTop = `-${currentScrollY}px`;

    menu.classList.add('menu--open');
    toggle.classList.add('toggle--open', 'header__button--open');
  };

  const closeMenu = () => {
    body.classList.remove('fixed');
    body.style.marginTop = `0`;
    window.scrollTo({
      top: currentScrollY,
      behavior: `instant`
    });
    currentScrollY = 0;

    menu.classList.remove('menu--open');
    toggle.classList.remove('toggle--open', 'header__button--open');
  };

  const shouldCloseMenu = (event) => {
    if (event.target.classList.contains('menu__link')) {
      closeMenu();
    }
  };

  const toggleMenu = () => {
    if (window.innerWidth <= 768) {
      if (menu.classList.contains('menu--open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }
  };

  toggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);
  menu.addEventListener('click', shouldCloseMenu);

  // Preload Images
  const IMAGE_PER_SEASON = 6;
  const Seasons = ['winter', 'spring', 'summer', 'autumn'];

  const createImgSrc = (season, index) => (
    `./assets/images/portfolio-img/${season}/${index}.jpg`
  );

  const preloadImages = () => {
    Seasons.forEach((season) => {
      for (let i = 1; i <= IMAGE_PER_SEASON; i++) {
        const img = new Image();
        img.src = createImgSrc(season, i);
      }
    });
  }

  preloadImages();

  // Portfolio Seasons
  const portfolioControls = document.querySelector('.portfolio__controls');
  const portfolioPhotos = document.querySelectorAll('.photo > img');

  const changeSeason = (event) => {
    if (event.target.classList.contains('portfolio__button')) {
      const currentControl = event.target;
      const season = currentControl.dataset.season;

      portfolioControls.querySelectorAll('.portfolio__button').forEach((item) => {
        item.classList.remove('button--active');
      });

      currentControl.classList.add('button--active');

      portfolioPhotos.forEach((img, index) => {
        img.src = createImgSrc(season, index + 1);
      });
    }
  };

  portfolioControls.addEventListener('click', changeSeason);

  // button effect
  const buttons = document.querySelectorAll('.button');

  [...buttons].forEach((button) => {
    button.addEventListener('click', function (event) {
      const coords = event.target.closest('.button').getBoundingClientRect();
      const x = event.clientX;
      const y = event.clientY;

      const buttonTop = coords.top;
      const buttonLeft = coords.left;

      const xInside = x - buttonLeft;
      const yInside = y - buttonTop;

      const circle = document.createElement('span');
      circle.classList.add('circle');
      circle.style.top = yInside + 'px';
      circle.style.left = xInside + 'px';

      this.appendChild(circle);

      setTimeout(() => circle.remove(), 300);
    })
  });
})();
