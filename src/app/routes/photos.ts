import config from "@config";
import fs from "fs";
import path from "path";
import pug from "pug";
import colors from "colors";
// import { Post as PostType } from "@src/types/post";

const render = pug.compileFile(
  path.join(`${__dirname}/../../templates/photos.pug`)
);

const photos = [
  { type: 'featured', src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/hyacinth.jpg' },
  { type: 'gallery', photos: [
    { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/lorien-blog-2.jpg' },
    { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/disillusion.jpg' },
  ]},
  { type: 'featured', src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/L1003180-min.jpg' },
  { type: 'featured', src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/leaf_scene_2-Edit-2-min.jpg' },
  { type: 'gallery', photos: [
    { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/000474390003-2-min.jpg' },
    { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/000474390012-Edit-min.jpg' },
  ]},
]

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
    photos,
    ...config,
  });

  fs.writeFile(`${outdir}/photos/index.html`, archive, (error: any): void => {
    if (error) {
      throw error;
    }

    console.log(colors.cyan("[page] photo gallery built"));
  });
}
