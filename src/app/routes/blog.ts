import config from "@config";
import fs from "fs";
import path from "path";
import pug from "pug";
import colors from "colors";
import { Post as PostType } from "@src/types/post";

const renderBlog = pug.compileFile(
  path.join(`${__dirname}/../../templates/blog.pug`)
);

/**
 * Render the blog.
 *
 * @param {object} posts - The posts to be rendered.
 */
export default function buildBlog(
  posts: Array<PostType>,
  outdir: string
): void {
  // Check to see if the blog directory has been built previously.
  if (!fs.existsSync(`${outdir}/blog`)) {
    // If the directory does not exist, build it.
    fs.mkdirSync(`${outdir}/blog`);
  }

  const homepage = renderBlog({
    posts,
    ...config,
  });

  fs.writeFile(`${outdir}/blog/index.html`, homepage, (error: any): void => {
    if (error) {
      throw error;
    }

    console.log(colors.cyan("[page] blog built"));
  });
}
