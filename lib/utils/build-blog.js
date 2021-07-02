const config = require("../../site-config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

const outdir = path.resolve(__dirname + "../../../build");

const renderBlog = pug.compileFile(
  path.join(__dirname, "../../src/templates/blog.pug")
);

/**
 * Render the blog.
 *
 * @param {object} posts - The posts to be rendered.
 */
function buildBlog(posts) {
  // Check to see if the blog directory has been built previously.
  if (!fs.existsSync(`${outdir}/blog`)) {
    // If the directory does not exist, build it.
    fs.mkdirSync(`${outdir}/blog`);
  }

  const homepage = renderBlog({
    posts,
    ...config,
  });

  fs.writeFile(`${outdir}/blog/index.html`, homepage, (error) => {
    if (error) {
      throw error;
    }

    console.log(`${"[page:blog]".red} built`);
  });
}

module.exports = buildBlog;
