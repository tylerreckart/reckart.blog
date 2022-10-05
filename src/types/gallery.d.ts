export type GalleryImage = {
  title?: string;
  location?: string;
  year?: number;
  src: string;
  alt: string;
}

export type PhotoGallery = {
  title: string;
  path: string;
  colophon: string;
  featuredImage: string;
  images: GalleryImage[];
}