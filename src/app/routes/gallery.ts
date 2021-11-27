import config from "@config";
import fs from "fs";
import path from "path";
import pug from "pug";
import colors from "colors";
import getPhotos from "@app/utils/get-photos";

const renderGallery = pug.compileFile(
  path.join(`${__dirname}/../../templates/gallery.pug`)
);

/**
 * Render the gallery.
 *
 * @param {array} photos - The photos to be rendered.
 */
export default function buildGallery(outdir: string): void {
  const photos = getPhotos("gallery");

  const gallery = renderGallery({
    photos,
    ...config,
  });

  if (!fs.existsSync(`${outdir}/gallery`)) {
    fs.mkdirSync(`${outdir}/gallery`);
  }

  fs.writeFile(`${outdir}/gallery/index.html`, gallery, (error: any): void => {
    if (error) {
      throw error;
    }

    console.log(colors.cyan("[page] gallery built"));
  });
}
