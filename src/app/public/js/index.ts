import handleGalleryEvents from "./gallery";

const iconMap = [
  "https://emojis.slackmojis.com/emojis/images/1450475643/211/homer-disappear.gif?1450475643",
  "https://emojis.slackmojis.com/emojis/images/1589877402/9116/excuseme.gif?1589877402",
  "https://emojis.slackmojis.com/emojis/images/1539890226/4845/rickroll.gif?1539890226",
  "https://emojis.slackmojis.com/emojis/images/1549317933/5264/coding.gif?1549317933",
];

function main(): void {
  // Populate site icon.
  const siteIcon = document.getElementById("site--icon");
  siteIcon!.setAttribute(
    "src",
    iconMap[Math.floor(Math.random() * iconMap.length)]
  );

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
