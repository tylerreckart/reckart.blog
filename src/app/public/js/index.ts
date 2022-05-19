function main(): void {
  // Set the active state on the nav element for the current page.
  const {
    location: { pathname },
  } = window;

  let path = pathname.split("/")[1];

  if (path.length === 0) {
    path = "/";
  }

  const nav = document.getElementById("nav");

  const currentPage: HTMLElement = [].filter.call(
    nav!.children,
    (el: HTMLElement) =>
      // @ts-ignore
      [].includes.call(el.classList, path !== "/" ? path : "home")
  )[0];
  currentPage.classList.add("active");

  const open = document.getElementById('trigger-open');
  const close = document.getElementById('trigger-close');
  const menu = document.getElementById('appearance-menu');

  document.addEventListener('click', (event) => {
    if (event.target === open) {
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
  })
}

document.addEventListener("DOMContentLoaded", main);
