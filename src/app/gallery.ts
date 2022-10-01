import config from "@config";
import colors from "colors";
import fs from "fs";
import path from "path";
import pug from "pug";

const renderGallery = pug.compileFile(
  path.join(`${__dirname}/../templates/gallery.pug`)
);

export default function buildGalleries(
  gallery: Record<string, unknown>[],
  outdir: string
): void {
  // Check to see if the blog directory has been built previously.
  if (!fs.existsSync(`${outdir}/blog`)) {
    // If the directory does not exist, build it.
    fs.mkdirSync(`${outdir}/blog`);
  }

  gallery.forEach((gallery) => {
    if (!fs.existsSync(`${outdir}/photos/${gallery.path}`)) {
      fs.mkdirSync(`${outdir}/photos/${gallery.path}`);
    }

    fs.writeFile(
      `${outdir}/photos/${gallery.path}/index.html`,
      renderGallery({ gallery, ...config }),
      (error: any): void => {
        if (error) {
          throw error;
        }

        console.log(colors.cyan(`[gallery] ${gallery.path} built`));
      }
    );
  });
}
