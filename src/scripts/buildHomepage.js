const config = require("../../site-config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

const outdir = path.resolve(__dirname + "../../../build");

const renderHomepage = pug.compileFile(
  path.join(__dirname, "../templates/home.pug")
);

/**
 * Render the homepage.
 *
 * @param {array} posts - The posts to be rendered.
 */
function buildHomepage(posts) {
  const homepage = renderHomepage({
    ...posts,
    ...config,
  });

  fs.writeFile(`${outdir}/index.html`, homepage, (error) => {
    if (error) {
      throw error;
    }

    console.log(`${"[page:home]".red} built`);
  });
}

module.exports = buildHomepage;
