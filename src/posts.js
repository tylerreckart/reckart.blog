const config = require("./config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

const renderPost = pug.compileFile(
  path.join(__dirname, "templates/post.pug")
);

const { outdir } = config;

function createPosts(posts) {
  posts.forEach((post) => {
    if (! fs.existsSync(outdir)) {
      fs.mkdirSync(outdir);
    }

    if (! fs.existsSync(`${outdir}/posts`)) {
      fs.mkdirSync(`${outdir}/posts`);
    }

    if (! fs.existsSync(`${outdir}/posts/${post.path}`)) {
      fs.mkdirSync(`${outdir}/posts/${post.path}`);
    }
    
    fs.writeFile(
      `${outdir}/posts/${post.path}/index.html`,
      renderPost(post),
      (error) => {
        if (error) {
          throw error;
        }
  
        console.log(`${post.path}/index.html created successfully`);
      }
    )
  })
}

module.exports = {
  createPosts,
};
