(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const iconMap = [
      "https://emojis.slackmojis.com/emojis/images/1450475643/211/homer-disappear.gif?1450475643",
      "https://emojis.slackmojis.com/emojis/images/1589877402/9116/excuseme.gif?1589877402",
      "https://emojis.slackmojis.com/emojis/images/1539890226/4845/rickroll.gif?1539890226",
      "https://emojis.slackmojis.com/emojis/images/1549317933/5264/coding.gif?1549317933",
    ];
    const siteIcon = document.getElementById("site--icon");
    console.log(siteIcon);
    siteIcon.setAttribute(
      "src",
      iconMap[Math.floor(Math.random() * iconMap.length)]
    );

    const {
      location: { pathname },
    } = window;

    let path = pathname.split("/")[1];

    if (path.length === 0) {
      path = "/";
    }

    const currentPage = [].filter.call(nav.children, (el) =>
      [].includes.call(el.classList, path !== "/" ? path : "home")
    )[0];

    currentPage.classList.add("active");
  });
})();
