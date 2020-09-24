const config = require("./config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

const renderPost = pug.compileFile(path.join(__dirname, "templates/post.pug"));

const { outdir } = config;

function buildPosts(posts) {
  posts.forEach((post) => {
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

        console.log(`${post.path}/index.html built`);
      }
    );
  });
}

module.exports = {
  buildPosts,
};
