const config = require("../../site-config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");
const colors = require("colors");

const outdir = path.resolve(__dirname + "../../../build");

const renderPage = pug.compileFile(
  path.join(__dirname, "../templates/page.pug")
);

/**
 * Take the page content, render the HTML markup and write the file to the
 * target directory.
 *
 * @param {array} pages - The pages to be rendered.
 */
function buildPages(pages) {
  pages.forEach((page) => {
    // Check to see if the current post directory has been built previously.
    if (!fs.existsSync(`${outdir}/${page.path}`)) {
      // If the directory does not exist, build it.
      fs.mkdirSync(`${outdir}/${page.path}`);
    }

    fs.writeFile(
      `${outdir}/${page.path}/index.html`,
      renderPage({
        ...page,
        ...config,
      }),
      (error) => {
        if (error) {
          throw error;
        }

        console.log(`${`[page:${page.path}]`.red} built`);
      }
    );
  });
}

module.exports = buildPages;
