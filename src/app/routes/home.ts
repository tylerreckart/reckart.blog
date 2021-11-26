import config from "@config";
import fs from "fs";
import path from "path";
import pug from "pug";
import { Post as PostType } from "@src/types/post.types";

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
  const homepage = renderHomepage({
    posts: [
      {
        ...posts[0],
        body: `<p>${posts[0].attributes.description}</p>`,
      },
      {
        ...posts[1],
        body: `<p>${posts[1].attributes.description}</p>`,
      },
    ],
    ...config,
  });

  fs.writeFile(`${outdir}/index.html`, homepage, (error: any): void => {
    if (error) {
      throw error;
    }

    console.log(`${"[page:home]"} built`);
  });
}
