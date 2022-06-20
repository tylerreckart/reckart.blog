import { handleGalleryEvents } from './gallery';

function main(): void {
  // Set the active state on the nav element for the current page.
  const {
    location: { pathname },
  } = window;

  let path = pathname.split("/")[1];

  if (path.length === 0) {
    path = "/";
  }

  const getClass = (): string => {
    if (path === '/') {
      return 'home';
    }

    if (path === 'archive') {
      return 'posts';
    }

    if (path === 'photos') {
      return 'gallery';
    }

    if (path === 'about') {
      return 'about';
    }

    return 'posts';
  }

  const currentPage: HTMLElement | null = document.querySelector(`.nav--link.${getClass()}`);
  currentPage?.classList.add("active");

  const open = document.getElementById('trigger-open');
  const close = document.getElementById('trigger-close');
  const menu = document.getElementById('appearance-menu');
  const darkModeToggle = document.getElementById('dark-mode--toggle');

  document.addEventListener('click', (event) => {
    const { target } = event; 
  
    if (target === open) {
      menu?.classList.add('animate-in');
      menu?.classList.remove('hidden');
      open?.classList.add('hidden');
      close?.classList.remove('hidden');

      setTimeout(() => {
        menu?.classList.remove('animate-in');
      }, 300);
    }

    if (event.target === close) {
      menu?.classList.add('animate-out');
      open?.classList.remove('hidden');
      close?.classList.add('hidden');
      
      setTimeout(() => {
        menu?.classList.remove('animate-out');
        menu?.classList.add('hidden');
      }, 300);
    }

    if (event.target === darkModeToggle) {
      const wasDarkModeActive = localStorage.getItem('darkmode') === '1';
      localStorage.setItem('darkmode', wasDarkModeActive ? '0' : '1');

      if (!document.body.classList.contains('dark')) {
        console.log('no dark');
        // Update toggle state.
        darkModeToggle?.classList.add('on');
        darkModeToggle?.classList.remove('off');
        // Add body class.
        document.body.classList.add('dark');
      } else {
        console.log('dark');
        // Update toggle state.
        darkModeToggle?.classList.remove('on');
        darkModeToggle?.classList.add('off');
        // Remove body class.
        document.body.classList.remove('dark');
      }
    }

    if ((target as HTMLElement)?.classList.contains('theme--target')) {
      const currentThemeTarget = document.querySelector('.theme--target.active');

      if (currentThemeTarget) {
        // Remove the active state from the current theme.
        currentThemeTarget.classList.remove('active');
        // Retrieve the theme's key.
        const theme = currentThemeTarget.classList[1];
        // Remove the current theme class.
        document.body.classList.remove(`theme--${theme}`);
      }

      const theme = (target as HTMLElement).classList[1];
      const nextTheme = `theme--${theme}`;
  
      // Load the theme variables into the body context.
      
      // Set the selected theme in localStorage for later.
      localStorage.setItem('theme', nextTheme);
      // Add the active class to the target theme.
      (target as HTMLElement).classList.add('active');
    }
  });

  if(!document.body.className.split(' ').some((c) => { return /theme--.*/.test(c); })) {
    let theme = localStorage.getItem('theme');

    if (!theme) {
      theme = 'theme--gruvbox';
      localStorage.setItem('theme', theme);
    }

    const themeTarget = document.querySelector(`.theme--target.${theme.replace('theme--', '')}`);

    if (themeTarget) {
      themeTarget.classList.add('active');
    }

    document.body.classList.add(theme);

    const wasDarkModeActive = localStorage.getItem('darkmode') === '1';

    if (wasDarkModeActive) {
      darkModeToggle?.classList.remove('off');
      darkModeToggle?.classList.add('on');
      document.body.classList.add('dark');
    }
  }

  document.body.classList.remove('hidden');
  // Initialize gallery event listeners.
  handleGalleryEvents();
}

window.addEventListener("load", main);
