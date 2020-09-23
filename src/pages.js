const config = require("./config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

const renderPage = pug.compileFile(
  path.join(__dirname, "templates/page.pug")
);

const { outdir } = config;

function createPages(pages) {
  pages.forEach((page) => {
    // Check to see if the `pages` directory has been built previously.
    if (! fs.existsSync(`${outdir}/pages`)) {
      // If the directory does not exist, create it.
      fs.mkdirSync(`${outdir}/pages`);
    }

    // Check to see if the current post directory has been built previously.
    if (! fs.existsSync(`${outdir}/pages/${page.path}`)) {
      // If the directory does not exist, create it.
      fs.mkdirSync(`${outdir}/pages/${page.path}`);
    }
    
    fs.writeFile(
      `${outdir}/pages/${page.path}/index.html`,
      renderPage(page),
      (error) => {
        if (error) {
          throw error;
        }
  
        console.log(`${page.path}/index.html built`);
      }
    )
  })
}

module.exports = {
  createPages,
};
