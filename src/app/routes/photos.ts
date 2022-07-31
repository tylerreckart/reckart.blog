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
    { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/smokies_river-untitled-1.jpg' },
    { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/revival.jpg' },
    { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/clingmans_dome-untitled-1.jpg' },
    { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/balance.jpg' },
  ]},
  { type: 'featured', src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/disillusion.jpg' },
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
