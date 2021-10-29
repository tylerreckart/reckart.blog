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

  function buildControls(parent) {
    const nextNode = document.createElement("svg");
    nextNode.id = "next-photo--trigger";
    nextNode.className = "caret--right";
    nextNode.setAttribute("viewbox", "0 0 9 16");
    nextNode.setAttribute(
      "style",
      "position: absolute;width: 13px;height: 24px;display: block;box-sizing: content-box;right: 24px;line-height: 2px;stroke: #ffffff;background-color: red;"
    );

    const nextLine = document.createElement("polyline");
    nextLine.setAttribute("fill", "none");
    nextLine.setAttribute("stroke", "#ffffff");
    nextLine.setAttribute("stroke-miterlimit", 10);
    nextLine.setAttribute("points", "1.6,1.2 6.5,7.9 1.6,14.7 ");

    nextNode.appendChild(nextLine);
    parent.appendChild(nextNode);

    const prevNode = document.createElement("svg");
    prevNode.id = "previous-photo--trigger";
    prevNode.className = "caret--left";
    prevNode.setAttribute("viewbox", "0 0 9 16");
    prevNode.setAttribute(
      "style",
      "position: absolute;width: 13px;height: 24px;display: block;box-sizing: content-box;left: 24px;line-height: 2px;stroke: #ffffff;background-color: red;"
    );

    const prevLine = document.createElement("polyline");
    prevLine.setAttribute("fill", "none");
    prevLine.setAttribute("stroke", "#ffffff");
    prevLine.setAttribute("stroke-miterlimit", 10);
    prevLine.setAttribute("points", "7.3,14.7 2.5,8 7.3,1.2 ");

    prevNode.appendChild(prevLine);
    parent.appendChild(prevNode);
  }

  function handlePopup(event) {
    const { target } = event;
    const {
      classList: { value },
    } = target;

    const image = document.getElementById("gallery--popup--image");

    if (event.target.id === "gallery--popup--overlay") {
      target.classList.add("fadeOut");

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
      buildControls(overlay);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
    }

    const collection = getCollection();
    const { src } = image;
    const index = collection.indexOf(src);

    if (event.target.id === "next-photo--trigger") {
      nextPhoto(image, collection, index);
    }

    if (event.target.id === "previous-photo--trigger") {
      previousPhoto(image, collection, index);
    }
  }

  document.addEventListener("click", handlePopup);

  function getCollection() {
    const collection = [];
    const images = document
      .getElementById("gallery--image-wrapper")
      .getElementsByTagName("img");

    for (let i = 0; i < images.length; i++) {
      collection[i] = images[i].src;
    }

    return collection;
  }

  function nextValidIndex(arr, nextIndex) {
    const length = arr.length;

    if (nextIndex >= length) {
      return 0;
    }

    if (nextIndex < 0) {
      return arr.length - 1;
    }

    return nextIndex;
  }

  function dismissPhoto(overlay, image) {
    overlay.classList.add("fadeOut");
    image.classList.add("slideDown");

    setTimeout(() => {
      document.body.removeChild(overlay);
      document.body.style.overflow = "auto";
    }, 500);
  }

  function previousPhoto(el, collection, index) {
    el.classList.add("slideOutRight");

    setTimeout(() => {
      el.classList.remove("slideOutRight");
      el.src = collection[nextValidIndex(collection, index + 1)];
      el.classList.add("slideInLeft");
    }, 500);

    setTimeout(() => {
      el.classList.remove("slideInLeft");
    }, 1000);
  }

  function nextPhoto(el, collection, index) {
    el.classList.add("slideOutLeft");

    setTimeout(() => {
      el.classList.remove("slideOutLeft");
      el.src = collection[nextValidIndex(collection, index - 1)];
      el.classList.add("slideInRight");
    }, 500);

    setTimeout(() => {
      image.classList.remove("slideInRight");
    }, 1000);
  }

  function handleKeyDown(event) {
    const { key } = event;

    const overlay = document.getElementById("gallery--popup--overlay");

    if (overlay) {
      const image = document.getElementById("gallery--popup--image");

      if (key === "Escape") {
        dismissPhoto(overlay, image);
      }

      const collection = getCollection();
      const { src } = image;
      const index = collection.indexOf(src);

      if (key === "ArrowRight") {
        nextPhoto(image, collection, index);
      }

      if (key === "ArrowLeft") {
        previousPhoto(image, collection, index);
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
