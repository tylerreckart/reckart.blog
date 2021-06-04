(function () {
  function handleGridItemClick(event) {
    const { target } = event;
    const {
      classList: { value },
    } = target;

    if (value.includes("grid--item")) {
      const { src } = target;

      const wrapper = document.createElement("div");
      const image = document.createElement("img");
      image.src = src;
      wrapper.appendChild(image);
      document.body.appendChild(wrapper);
    }
  }

  document.addEventListener("click", handleGridItemClick);
})();
