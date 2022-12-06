import config from "@config";
import fs from "fs";
import path from "path";
import pug from "pug";
import colors from "colors";
import { generateNextPost } from "@src/app/post";
import { Post as PostType } from "@src/types/post";

const renderHomepage = pug.compileFile(
  path.join(`${__dirname}/../../templates/home.pug`)
);

/**
 * Render the homepage.
 *
 * @param {object} post - The most recent post to be rendered.
 */
export default function buildHome(
  posts: Array<PostType>,
  outdir: string
): void {
  const homepage = renderHomepage({ ...posts[0], ...config, nextPost: generateNextPost(posts[1]) });

  fs.writeFile(`${outdir}/index.html`, homepage, (error: any): void => {
    if (error) {
      throw error;
    }

    console.log(colors.cyan("[page] home built"));
  });
}
