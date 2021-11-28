function buildLightbox(): HTMLElement {
  // Create the element.
  const overlay = document.createElement("div");
  overlay.id = "lightbox--overlay";
  // Trigger the animation.
  overlay.classList.add("fadeIn");
  // Remove the class name after the animation has run.
  setTimeout(() => {
    overlay.classList.remove("fadeIn");
  }, 1000);

  return overlay;
}

function buildImage(
  parent: HTMLElement,
  data: { src: string; alt: string; description: string }
): void {
  // Format the image wrapper.
  const wrapper = document.createElement("div");
  wrapper.id = "lightbox--image-wrapper";
  wrapper.setAttribute(
    "style",
    "display:flex; flex-direction:column; align-items:center; position:absolute; top:50%; transform:translateY(-50%) ;max-width:900px;"
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
    "font-size:14px; line-height:14px; margin-top:16px; margin-bottom:0;"
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
  // Insert the image wrapper into the light box.
  parent.appendChild(wrapper);
}

function nextValidIndex(
  arr: Array<{ src: string; alt: string; description: string }>,
  nextIndex: number
): number {
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
  wrapper: HTMLElement,
  image: HTMLImageElement,
  description: Element,
  nextSrc: string,
  nextDescription: string,
  nextAlt: string,
  direction: string
): void {
  const inClass = `slideIn${direction === "left" ? "Right" : "Left"}`;
  const outClass = `slideOut${direction === "left" ? "Left" : "Right"}`;

  wrapper.classList.add(outClass);

  setTimeout(() => {
    wrapper.classList.remove(outClass);
    image.src = nextSrc;
    image.alt = nextAlt;
    description.innerHTML = nextDescription;
    wrapper.classList.add(inClass);
  }, 500);

  setTimeout(() => {
    wrapper.classList.remove(inClass);
  }, 1000);
}

function handlePopup(event: any): void {
  const { target } = event;
  const {
    classList: { value },
  } = target;

  if (event.target.id === "lightbox--overlay") {
    target.classList.add("fadeOut");

    const image = document.getElementById("lightbox--image-wrapper");
    image!.classList.add("slideDown");

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

function handleKeyDown(event: KeyboardEvent): void {
  const { key } = event;

  const overlay = document.getElementById("lightbox--overlay");

  if (overlay) {
    const wrapper = document.getElementById("lightbox--image-wrapper");

    if (key === "Escape") {
      overlay.classList.add("fadeOut");
      wrapper!.classList.add("slideDown");

      setTimeout(() => {
        document.body.removeChild(overlay);
        document.body.style.overflow = "auto";
      }, 500);
    }

    // @ts-ignore
    const images = document
      .getElementById("gallery--image-wrapper")
      .getElementsByTagName("img");

    const collection = Array.from(images).map((i) => ({
      src: i.src,
      alt: i.alt,
      description: i.dataset.description,
    }));

    // @ts-ignore
    const image: HTMLImageElement = wrapper!.children[0];
    const description: Element = wrapper!.children[1];

    const index = collection.indexOf(
      // @ts-ignore
      collection.find((i) => i.src === image.src)
    );

    if (key === "ArrowRight") {
      nextImage(
        // @ts-ignore
        wrapper,
        image,
        description,
        // @ts-ignore
        collection[nextValidIndex(collection, index + 1)].src,
        // @ts-ignore
        collection[nextValidIndex(collection, index + 1)].description,
        // @ts-ignore
        collection[nextValidIndex(collection, index + 1)].alt,
        "right"
      );
    }

    if (key === "ArrowLeft") {
      nextImage(
        // @ts-ignore
        wrapper,
        image,
        description,
        // @ts-ignore
        collection[nextValidIndex(collection, index - 1)].src,
        // @ts-ignore
        collection[nextValidIndex(collection, index - 1)].description,
        // @ts-ignore
        collection[nextValidIndex(collection, index + 1)].alt,
        "left"
      );
    }
  }
}

function handleViewportConstraints(event: any): void {
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

function handleResize(event: any): void {
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

export default function handleGalleryEvents(): void {
  // Attach window events.
  window.addEventListener("resize", handleResize);
  // Attach document events.
  document.addEventListener("click", handlePopup);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("DOMContentLoaded", handleViewportConstraints);
}
