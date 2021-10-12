(function () {
  document.addEventListener("DOMContentLoaded", () => {
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
