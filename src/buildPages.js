const config = require("../config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");
const colors = require("colors");

const {
  outdir,
  theme,
} = config;

const renderPage = pug.compileFile(path.join(__dirname, `themes/${theme}/templates/page.pug`));

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

        console.log(`${"page =>".yellow} ${page.path} built`);
      }
    );
  });
}

module.exports = buildPages;
