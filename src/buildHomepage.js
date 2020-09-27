const config = require("../config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");
const colors = require("colors");

const {
  outdir,
  theme
} = config;

const renderHomepage = pug.compileFile(
  path.join(__dirname, `themes/${theme}/templates/home.pug`)
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

    console.log(`${"homepage =>".red} index.html built`);
  });
}

module.exports = buildHomepage;
