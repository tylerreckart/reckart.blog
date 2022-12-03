export type GalleryImage = {
  title?: string;
  location?: string;
  year?: number;
  src: string;
  alt: string;
}

export type PhotoGallery = GalleryImage[];