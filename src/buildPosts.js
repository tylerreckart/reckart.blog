const config = require("../config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");
const colors = require("colors");

const renderPost = pug.compileFile(path.join(__dirname, "templates/post.pug"));

const { outdir, author, siteName, siteIcon, siteUrl, twitterHandle } = config;

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

function buildPosts(posts) {
  const remappedPosts = posts.map((post, index) => {
    return {
      siteName,
      siteIcon,
      siteUrl,
      twitterHandle,
      author,
      ...post,
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

        console.log(`${"post =>".cyan} ${post.path} built`);
      }
    );
  });
}

module.exports = buildPosts;
