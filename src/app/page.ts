import config from "@config";
import fs from "fs";
import path from "path";
import pug from "pug";
import { Page as PageType } from "@src/types/page.types";

const renderPages = pug.compileFile(
  path.join(`${__dirname}/../templates/page.pug`)
);

/**
 * Take the page content, render the HTML markup and write the file to the
 * target directory.
 *
 * @param {array} pages - The pages to be rendered.
 */
export default function buildPages(pages: Array<PageType>, dest: string): void {
  pages.forEach((page) => {
    // Check to see if the current post directory has been built previously.
    if (!fs.existsSync(`${dest}/${page.path}`)) {
      // If the directory does not exist, build it.
      fs.mkdirSync(`${dest}/${page.path}`);
    }

    fs.writeFile(
      `${dest}/${page.path}/index.html`,
      renderPages({
        ...page,
        ...config,
      }),
      (error) => {
        if (error) {
          throw error;
        }

        console.log(`${`[page:${page.path}]`} built`);
      }
    );
  });
}
