const config = require("../../site-config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

const outdir = path.resolve(__dirname + "../../../build");

const renderPost = pug.compileFile(
  path.join(__dirname, "../templates/post.pug")
);

/**
 * Build the content for the `nextPost` property that allows previous posts
 * to be directly linked to on post pages.
 *
 * @param {object} post - The post to be parsed.
 *
 * @returns {object} The formatted post.
 */
function generateNextPost(post) {
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
function buildPosts(posts) {
  const remappedPosts = posts.map((post, index) => {
    return {
      ...post,
      ...config,
      nextPost: generateNextPost(posts[index + 1]),
    };
  });

  remappedPosts.forEach((post) => {
    if (!fs.existsSync(`${outdir}/${post.path}`)) {
      fs.mkdirSync(`${outdir}/${post.path}`);
    }

    fs.writeFile(
      `${outdir}/${post.path}/index.html`,
      renderPost(post),
      (error) => {
        if (error) {
          throw error;
        }

        console.log(`${`[post:${post.path}]`.cyan} built`);
      }
    );
  });
}

module.exports = buildPosts;
