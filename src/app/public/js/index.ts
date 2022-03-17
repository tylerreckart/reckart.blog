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

  const openTrigger = document.getElementById('menu-open--trigger');
  const closeTrigger = document.getElementById('menu-close--trigger');

  openTrigger!.addEventListener('click', () => {
    nav!.classList.add('active');
    openTrigger!.classList.add('hidden');
    closeTrigger!.classList.remove('hidden');
  });

  closeTrigger!.addEventListener('click', () => {
    nav!.classList.add('dismiss');
    closeTrigger!.classList.add('hidden');
    openTrigger!.classList.remove('hidden');

    setTimeout(() => {
      nav!.classList.remove('active');
      nav!.classList.remove('dismiss');
    }, 450);
  });
}

document.addEventListener("DOMContentLoaded", main);
