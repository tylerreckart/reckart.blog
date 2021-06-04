(function () {
  function buildStyles(el, style) {
    for (const property in style) {
      el.style[property] = style[property];
    }
  }

  function handleGridItemClick(event) {
    const { target } = event;
    const {
      classList: { value },
    } = target;

    if (event.target.id === "gallery--popup--overlay") {
      document.body.removeChild(target);
    }

    if (value.includes("grid--item")) {
      const { src } = target;

      const overlay = document.createElement("div");
      overlay.id = "gallery--popup--overlay";
      const overlayStyleMap = {
        "background-color": "rgba(0, 0, 0, .5)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        overflow: "hidden",
      };
      buildStyles(overlay, overlayStyleMap);

      const image = document.createElement("img");
      image.src = src;
      const imageStyleMap = {
        margin: "2em",
      };
      buildStyles(image, imageStyleMap);

      overlay.appendChild(image);

      document.body.appendChild(overlay);
    }
  }

  document.addEventListener("click", handleGridItemClick);
})();
