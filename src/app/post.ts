import config from "@config";
import colors from "colors";
import fs from "fs";
import path from "path";
import pug from "pug";
import { Post as PostType } from "@src/types/post.types";

const renderPost = pug.compileFile(
  path.join(`${__dirname}/../templates/post.pug`)
);

type Markdown = {
  attributes: object;
  path: string;
  body: string;
};

/**
 * Build the content for the `nextPost` property that allows previous posts
 * to be directly linked to on post pages.
 *
 * @param {object} post - The post to be parsed.
 *
 * @returns {object} The formatted post.
 */
function generateNextPost(post: Markdown): PostType | null {
  if (!post) {
    return null;
  }

  const { attributes, path, body } = post;

  return {
    attributes,
    path,
    body: body
      .split("<p>")
      .slice(0, 3)
      .filter((str) => !str.includes("<img"))
      .join("<p>"),
  };
}

/**
 * Take the post content, render the HTML markup and write the file to the
 * target directory.
 *
 * @param {array} posts - The posts to be rendered.
 */
export default function buildPosts(
  posts: Array<PostType>,
  outdir: string
): void {
  // Check to see if the blog directory has been built previously.
  if (!fs.existsSync(`${outdir}/blog`)) {
    // If the directory does not exist, build it.
    fs.mkdirSync(`${outdir}/blog}`);
  }

  const remappedPosts = posts.map((post: PostType, index: number) => {
    return {
      ...post,
      ...config,
      nextPost: generateNextPost(posts[index + 1]),
    };
  });

  remappedPosts.forEach((post: PostType) => {
    if (!fs.existsSync(`${outdir}/blog/${post.path}`)) {
      fs.mkdirSync(`${outdir}/blog/${post.path}`);
    }

    fs.writeFile(
      `${outdir}/blog/${post.path}/index.html`,
      renderPost(post),
      (error: any): void => {
        if (error) {
          throw error;
        }

        console.log(colors.cyan(`[post] ${post.path} built`));
      }
    );
  });
}
