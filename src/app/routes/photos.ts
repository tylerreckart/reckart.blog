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
  { type: 'featured', src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/20220617-hyacinth-velvia.jpg', alt: 'Chlorophyll, 2022 - Chamonix 45-N2, Fujifilm Velvia 50'},
  { type: 'gallery', photos: [
    { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/ladder.jpg' },
    { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/lyman.jpg' },
    { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/moored.jpg' },
    { src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/parking.jpg' },
  ]}
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
