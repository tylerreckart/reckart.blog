import { handleGalleryEvents } from './gallery';

/**
 * Add copy buttons and language badges to code blocks
 */
function enhanceCodeBlocks(): void {
  const codeBlocks = document.querySelectorAll('pre > code');

  codeBlocks.forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    if (!pre) return;

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');

    copyButton.addEventListener('click', async () => {
      const code = codeBlock.textContent || '';

      try {
        await navigator.clipboard.writeText(code);
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');

        setTimeout(() => {
          copyButton.textContent = 'Copy';
          copyButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
        copyButton.textContent = 'Error';

        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      }
    });

    pre.insertBefore(copyButton, codeBlock);
  });
}

/**
 * Generate a random HSL color with good saturation and lightness
 */
function randomHSLColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 50 + Math.floor(Math.random() * 30); // 50-80%
  const lightness = 45 + Math.floor(Math.random() * 15); // 45-60%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Randomize the theme colors of the website
 */
function randomizeTheme(): void {
  const root = document.documentElement;

  // Generate a new accent color
  const newPurple = randomHSLColor();
  const newGray = randomHSLColor();

  root.style.setProperty('--purple', newPurple);
  root.style.setProperty('--gray', newGray);

  // Store in localStorage so it persists
  localStorage.setItem('theme-purple', newPurple);
  localStorage.setItem('theme-gray', newGray);
}

/**
 * Restore theme from localStorage if available
 */
function restoreTheme(): void {
  const savedPurple = localStorage.getItem('theme-purple');
  const savedGray = localStorage.getItem('theme-gray');

  if (savedPurple) {
    document.documentElement.style.setProperty('--purple', savedPurple);
  }
  if (savedGray) {
    document.documentElement.style.setProperty('--gray', savedGray);
  }
}

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
      return 'blog';
    }

    if (path === 'posts') {
      return 'posts';
    }

    if (path === 'photos') {
      return 'gallery';
    }

    if (path === 'projects') {
      return 'projects';
    }

    if (path === 'about') {
      return 'about';
    }

    if (path === 'work') {
      return 'work';
    }

    return '';
  }

  const currentPage: HTMLElement | null = document.querySelector(`#nav>.nav--link.${getClass()}`);
  console.log(currentPage);
  currentPage?.classList.add("active");

  document.body.classList.remove('hidden');

  // Initialize gallery event listeners.
  handleGalleryEvents();

  // Enhance code blocks with copy buttons and language badges
  enhanceCodeBlocks();

  // Restore saved theme
  restoreTheme();

  // Theme randomizer button
  const themeRandomizer = document.getElementById('theme-randomizer');
  themeRandomizer?.addEventListener('click', randomizeTheme);

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
