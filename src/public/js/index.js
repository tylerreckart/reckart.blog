(function () {
  document.addEventListener("DOMContentLoaded", (event) => {
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
    console.log(currentPage);
    currentPage.classList.add("active");
  });
})();
