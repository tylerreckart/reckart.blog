// deno-lint-ignore ban-ts-comment
// @ts-ignore
import { GalleryImage } from '@src/types/gallery';

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

function buildImage(parent: HTMLElement, data: GalleryImage): void {
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
  image.setAttribute("style", "max-width:60vw; max-height:90vh;");

  // Trigger the transition animation.
  wrapper.classList.add("slideUp");
  setTimeout(() => {
    wrapper.classList.remove("slideUp");
  }, 1000);

  // Insert the target image into the image wrapper.
  wrapper.appendChild(image);
  // Insert the image wrapper into the light box.
  parent.appendChild(wrapper);
}

function nextValidIndex(arr: Array<GalleryImage>, nextIndex: number): number {
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
  wrapper: HTMLElement | null,
  image: HTMLImageElement | null,
  next: GalleryImage,
  direction: string
): void {
  if (!wrapper || !image) {
    return;
  }

  const inClass = `slideIn${direction === "left" ? "Right" : "Left"}`;
  const outClass = `slideOut${direction === "left" ? "Left" : "Right"}`;

  wrapper.classList.add(outClass);

  setTimeout(() => {
    wrapper.classList.remove(outClass);
    image.src = next.src;
    image.alt = next.alt;
    wrapper.classList.add(inClass);
  }, 500);

  setTimeout(() => {
    wrapper.classList.remove(inClass);
  }, 1000);
}

function handlePopup(event: Event): void {
  const { target } = event;
  const {
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    classList: { value },
  } = target;

  const { id, classList } = target as HTMLElement;
  
  if (target) {
    if (id === "lightbox--overlay") {
      classList.add("fadeOut");

      const image = document.getElementById("lightbox--image-wrapper");
      image!.classList.add("slideDown");

      setTimeout(() => {
        document.body.removeChild(target as HTMLElement);
        document.body.style.overflow = "auto";
      }, 350);
    }

    if (value.includes("gallery-page--image")) {
      const { src, alt } = target as HTMLImageElement;

      const lightbox = buildLightbox();
      buildImage(lightbox, { src, alt });

      document.body.appendChild(lightbox);
      document.body.style.overflow = "hidden";
    }
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

    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    const images = document
      .getElementById("gallery--image-wrapper")
      .getElementsByTagName("img");

    const collection = Array.from(images).map((i) => ({
      src: i.src,
      alt: i.alt,
    }));

    if (collection) {
      const image = document.getElementById("gallery--popup--image") as HTMLImageElement;

      if (image) {
        const index = collection.indexOf(
          // deno-lint-ignore ban-ts-comment
          // @ts-ignore
          collection.find((i) => i.src === image.src)
        );

        const nextItem = collection[nextValidIndex(collection, index + 1)];
        const prevItem = collection[nextValidIndex(collection, index - 1)];

        if (nextItem && key === "ArrowRight") {
          nextImage(wrapper, image, nextItem, "right");
        }

        if (prevItem && key === "ArrowLeft") {
          nextImage(wrapper, image, prevItem, "left");
        }
      }
    }
  }
}

function handleViewportConstraints(event: Event): void {
  const {
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    target: { body },
  } = event;

  if (body) {
    const { offsetWidth } = body;

    if (offsetWidth < 970) {
      document.removeEventListener("click", handlePopup);
    }
  }
}

function handleResize(event: Event): void {
  const {
    target: {
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
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

export function handleGalleryEvents(): void {
  // Attach window events.
  // deno-lint-ignore no-window-prefix
  window.addEventListener("resize", handleResize);
  // Attach document events.
  document.addEventListener("click", handlePopup);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("DOMContentLoaded", handleViewportConstraints);
}