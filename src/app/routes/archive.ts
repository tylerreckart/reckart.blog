import config from "@config";
import fs from "fs";
import path from "path";
import pug from "pug";
import colors from "colors";
import { Post as PostType } from "@src/types/post";

const render = pug.compileFile(
  path.join(`${__dirname}/../../templates/archive.pug`)
);

/**
 * Render the homepage.
 *
 * @param {object} post - The most recent post to be rendered.
 */
export default function buildArchive(
  posts: Array<PostType>,
  outdir: string
): void {
  // Check to see if the current post directory has been built previously.
  if (!fs.existsSync(`${outdir}/archive`)) {
    // If the directory does not exist, build it.
    fs.mkdirSync(`${outdir}/archive`);
  }

  const archive = render({
    posts,
    ...config,
  });

  fs.writeFile(`${outdir}/archive/index.html`, archive, (error: any): void => {
    if (error) {
      throw error;
    }

    console.log(colors.cyan("[page] archive built"));
  });
}
