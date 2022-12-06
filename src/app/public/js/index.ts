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
      return 'posts';
    }

    if (path === 'posts') {
      return 'posts';
    }

    if (path === 'photos') {
      return 'gallery';
    }

    if (path === 'about') {
      return 'about';
    }

    if (path === 'projects') {
      return 'projects';
    }

    return '';
  }

  const currentPage: HTMLElement | null = document.querySelector(`#nav>.nav--link.${getClass()}`);
  console.log(currentPage);
  currentPage?.classList.add("active");

  document.body.classList.remove('hidden');
  // Initialize gallery event listeners.
  handleGalleryEvents();

  const mobileMenu: HTMLElement | null = document.getElementById('mobile-nav-trigger');
  const mobileNav: HTMLElement | null = document.getElementById('mobile-nav');

  document.addEventListener('click', (event) => {
    const { target } = event;

    const isActive = mobileMenu?.classList.contains('active');
    
    if (target === mobileMenu && !isActive) {
      document.body.classList.add('fixed');
      mobileNav?.classList.add('open');
      mobileMenu?.classList.add('active');
    } else if (target === mobileMenu && isActive) {
      document.body.classList.remove('fixed');
      mobileNav?.classList.remove('open');
      mobileMenu?.classList.remove('active');
      mobileMenu?.classList.add('reverse');

      setTimeout(() => {
        mobileMenu?.classList.remove('reverse');
      }, 350);
    }
  });
}

// deno-lint-ignore no-window-prefix
window.addEventListener("load", main);
