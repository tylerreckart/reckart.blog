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

    const overlayStyleMap = {
      "background-color": "rgba(0, 0, 0, 1)",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
    };

    buildStyles(overlay, overlayStyleMap);

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

    const closeBtn = document.createElement("div");
    closeBtn.classList.add("close-btn--wrapper");

    const closeContent = document.createElement("span");
    closeContent.innerHTML = "X";
    closeContent.classList.add("close-btn--content");

    closeBtn.appendChild(closeContent);

    imageWrapper.appendChild(closeBtn);

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

    if (value.includes("grid--item")) {
      const { src } = target;
      const overlay = buildOverlay();
      buildImage(overlay, src);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
    }
  }

  document.addEventListener("click", handlePopup);
})();
