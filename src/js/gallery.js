(function () {
  function buildLightbox() {
    // Format the lightbox.
    const overlay = document.createElement("div");
    overlay.id = "lightbox--overlay";

    // Trigger the transition animation.
    overlay.classList.add("fadeIn");
    setTimeout(() => {
      overlay.classList.remove("fadeIn");
    }, 1000);

    return overlay;
  }

  function buildImage(parent, data) {
    // Format the image wrapper.
    const wrapper = document.createElement("div");
    wrapper.id = "lightbox--image-wrapper";
    wrapper.setAttribute(
      "style",
      "display:flex; flex-direction:column; align-items:flex-start; position:absolute; top:50%; transform:translateY(-50%) ;max-width:900px;"
    );

    // Format the image.
    const image = document.createElement("img");
    image.id = "gallery--popup--image";
    image.src = data.src;
    image.alt = data.alt;
    image.setAttribute("style", "max-width:100%; max-height:90vh;");

    // Format the image description.
    const description = document.createElement("p");
    description.setAttribute(
      "style",
      "font-size:14px; line-height:14px; margin-top:24px; margin-bottom:0;"
    );
    description.innerHTML = data.description;

    // Trigger the transition animation.
    wrapper.classList.add("slideUp");
    setTimeout(() => {
      wrapper.classList.remove("slideUp");
    }, 1000);

    // Insert the target image and description into the image wrapper.
    wrapper.appendChild(image);
    wrapper.appendChild(description);
    // Insert the image wrapper into the lightbox.
    parent.appendChild(wrapper);
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

  function nextImage(
    wrapper,
    image,
    description,
    nextSrc,
    nextDescription,
    direction
  ) {
    const inClass = `slideIn${direction === "left" ? "Right" : "Left"}`;
    const outClass = `slideOut${direction === "left" ? "Left" : "Right"}`;

    wrapper.classList.add(outClass);

    setTimeout(() => {
      wrapper.classList.remove(outClass);
      image.src = nextSrc;
      description.innerHTML = nextDescription;
      wrapper.classList.add(inClass);
    }, 500);

    setTimeout(() => {
      wrapper.classList.remove(inClass);
    }, 1000);
  }

  function handlePopup(event) {
    const { target } = event;
    const {
      classList: { value },
    } = target;

    if (event.target.id === "lightbox--overlay") {
      target.classList.add("fadeOut");

      const image = document.getElementById("lightbox--image-wrapper");
      image.classList.add("slideDown");

      setTimeout(() => {
        document.body.removeChild(target);
        document.body.style.overflow = "auto";
      }, 350);
    }

    if (value.includes("gallery--item")) {
      const {
        src,
        alt,
        dataset: { description },
      } = target;

      const lightbox = buildLightbox();
      buildImage(lightbox, { src, alt, description });

      document.body.appendChild(lightbox);
      document.body.style.overflow = "hidden";
    }
  }

  document.addEventListener("click", handlePopup);

  function handleKeyDown(event) {
    const { key } = event;

    const overlay = document.getElementById("lightbox--overlay");

    if (overlay) {
      const wrapper = document.getElementById("lightbox--image-wrapper");

      if (key === "Escape") {
        overlay.classList.add("fadeOut");
        wrapper.classList.add("slideDown");

        setTimeout(() => {
          document.body.removeChild(overlay);
          document.body.style.overflow = "auto";
        }, 500);
      }

      const images = document
        .getElementById("gallery--image-wrapper")
        .getElementsByTagName("img");

      const collection = Array.from(images).map((i) => ({
        src: i.src,
        description: i.dataset.description,
      }));

      const image = wrapper.children[0];
      const description = wrapper.children[1];

      const index = collection.indexOf(
        collection.find((i) => i.src === image.src)
      );

      if (key === "ArrowRight") {
        nextImage(
          wrapper,
          image,
          description,
          collection[nextValidIndex(collection, index + 1)].src,
          collection[nextValidIndex(collection, index + 1)].description,
          "right"
        );
      }

      if (key === "ArrowLeft") {
        nextImage(
          wrapper,
          image,
          description,
          collection[nextValidIndex(collection, index - 1)].src,
          collection[nextValidIndex(collection, index - 1)].description,
          "left"
        );
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

  document.addEventListener("DOMContentLoaded", handleViewportConstraints);

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

  window.addEventListener("resize", handleResize);
})();
