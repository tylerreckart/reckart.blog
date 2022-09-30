import config from "@config";
import fs from "fs";
import path from "path";
import pug from "pug";
import colors from "colors";
// import { Post as PostType } from "@src/types/post";

const render = pug.compileFile(
  path.join(`${__dirname}/../../templates/photos.pug`)
);

type GalleryImage = {
  title: string;
  year: number;
  src: string;
}

type PhotoGallery = {
  title: string;
  colophon: string;
  featuredImage: string;
  images: GalleryImage[];
}

const gallery: PhotoGallery[] = [
  {
    title: 'Intimate Nature',
    colophon: 'Much of my photography focuses on smaller, intimate scenes. The subjects in these scenes may often be overlooked.',
    featuredImage: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/hyacinth.jpg',
    images: [
      { title: 'Clorophyll', year: 2022, src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/hyacinth.jpg' },
    ],
  },
  {
    title: 'Of Land',
    colophon: '',
    featuredImage: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/disillusion.jpg',
    images: [
      { title: 'Disillusion', year: 2022, src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/disillusion.jpg' },
    ]
  },
  {
    title: 'Of Water',
    colophon: '',
    featuredImage: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/lorien-blog-2.jpg',
    images: [
      { title: 'Lothlorien', year: 2022, src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/lorien-blog-2.jpg' },
    ],
  }
];

// const photos = [
//   { type: 'featured', src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/hyacinth.jpg' },
//   { type: 'gallery', photos: [
//     { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/lorien-blog-2.jpg' },
//     { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/disillusion.jpg' },
//   ]},
//   { type: 'featured', src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/L1003180-min.jpg' },
//   { type: 'featured', src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/leaf_scene_2-Edit-2-min.jpg' },
//   { type: 'gallery', photos: [
//     { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/000474390003-2-min.jpg' },
//     { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/000474390012-Edit-min.jpg' },
//   ]},
// ]

export default function buildPhotoGallery(
  // photos: Array<PostType>,
  outdir: string
): void {
  // Check to see if the current post directory has been built previously.
  if (!fs.existsSync(`${outdir}/photos`)) {
    // If the directory does not exist, build it.
    fs.mkdirSync(`${outdir}/photos`);
  }

  const archive = render({
    gallery,
    ...config,
  });

  fs.writeFile(`${outdir}/photos/index.html`, archive, (error: Error | null): void => {
    if (error) {
      throw error;
    }

    console.log(colors.cyan("[page] photo gallery built"));
  });
}
