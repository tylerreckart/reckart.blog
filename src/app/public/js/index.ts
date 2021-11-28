import randomizeSiteIcon from "./utils/icons";
import handleGalleryEvents from "./routes/gallery";

function main(): void {
  // Populate the site icon
  randomizeSiteIcon();
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

  // On /gallery, attach the light box event handlers.
  if (path === "gallery") {
    handleGalleryEvents();
  }
}

document.addEventListener("DOMContentLoaded", main);
