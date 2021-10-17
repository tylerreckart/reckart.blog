(function () {
  function buildStyles(el, style) {
    for (const property in style) {
      el.style[property] = style[property];
    }
  }

  function buildOverlay() {
    const overlay = document.createElement("div");

    overlay.id = "gallery--popup--overlay";
    overlay.classList.add("fadeIn");
    setTimeout(() => {
      overlay.classList.remove("fadeIn");
    }, 350);

    return overlay;
  }

  function buildImage(parent, src) {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("image--wrapper");

    const image = document.createElement("img");
    image.id = "gallery--popup--image";
    image.src = src;
    image.classList.add("slideUp");

    setTimeout(() => {
      image.classList.remove("slideUp");
    }, 350);

    const imageStyleMap = {
      display: "block",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      height: "100%",
    };

    buildStyles(image, imageStyleMap);
    imageWrapper.appendChild(image);
    parent.appendChild(imageWrapper);
  }

  function handlePopup(event) {
    const { target } = event;
    const {
      classList: { value },
    } = target;

    if (event.target.id === "gallery--popup--overlay") {
      target.classList.add("fadeOut");

      const image = document.getElementById("gallery--popup--image");
      image.classList.add("slideDown");

      setTimeout(() => {
        document.body.removeChild(target);
        document.body.style.overflow = "auto";
      }, 350);
    }

    if (value.includes("gallery--item")) {
      const { src } = target;
      const overlay = buildOverlay();
      buildImage(overlay, src);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
    }
  }

  document.addEventListener("click", handlePopup);
})();
