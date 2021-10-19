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
    }, 1000);

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
    }, 1000);

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

  function nextValidIndex(arr, nextIndex) {
    console.log(arr, nextIndex);
    const length = arr.length;

    if (nextIndex >= length) {
      return 0;
    }

    if (nextIndex < 0) {
      return arr.length - 1;
    }

    return nextIndex;
  }

  function handleKeyDown(event) {
    const { key } = event;

    const overlay = document.getElementById("gallery--popup--overlay");

    if (overlay) {
      const image = document.getElementById("gallery--popup--image");

      if (key === "Escape") {
        overlay.classList.add("fadeOut");
        image.classList.add("slideDown");
        setTimeout(() => {
          document.body.removeChild(overlay);
          document.body.style.overflow = "auto";
        }, 500);
      }

      const collection = [];
      const images = document
        .getElementById("gallery--image-wrapper")
        .getElementsByTagName("img");

      for (let i = 0; i < images.length; i++) {
        collection[i] = images[i].src;
      }

      const { src } = image;
      const index = collection.indexOf(src);

      if (key === "ArrowRight") {
        image.classList.add("slideOutRight");

        setTimeout(() => {
          image.classList.remove("slideOutRight");
          image.src = collection[nextValidIndex(collection, index + 1)];
          image.classList.add("slideInLeft");
        }, 500);

        setTimeout(() => {
          image.classList.remove("slideInLeft");
        }, 1000);
      }

      if (key === "ArrowLeft") {
        image.classList.add("slideOutLeft");

        setTimeout(() => {
          image.classList.remove("slideOutLeft");
          image.src = collection[nextValidIndex(collection, index - 1)];
          image.classList.add("slideInRight");
        }, 500);

        setTimeout(() => {
          image.classList.remove("slideInRight");
        }, 1000);
      }
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  function handleViewportConstraints(event) {
    const {
      target: { body },
    } = event;

    if (body) {
      const { offsetWidth } = body;

      if (offsetWidth < 970) {
        document.removeEventListener("click", handlePopup);
      }
    }
  }

  function handleResize(event) {
    const {
      target: {
        document: { body },
      },
    } = event;

    if (body) {
      const { offsetWidth } = body;

      if (offsetWidth < 970) {
        document.removeEventListener("click", handlePopup);
      } else {
        document.addEventListener("click", handlePopup);
      }
    }
  }
  document.addEventListener("DOMContentLoaded", handleViewportConstraints);
  window.addEventListener("resize", handleResize);
})();
