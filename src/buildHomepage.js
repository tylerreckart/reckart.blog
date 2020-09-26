const config = require("../config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");
const colors = require("colors");

const {
  outdir,
  theme,
  siteConfig,
  seoConfig,
  socialConfig,
} = config;

const renderHomepage = pug.compileFile(
  path.join(__dirname, `themes/${theme}/templates/home.pug`)
);

function buildHomepage(posts) {
  const homepage = renderHomepage({
    ...posts,
    siteConfig,
    seoConfig,
    socialConfig,
  });

  fs.writeFile(`${outdir}/index.html`, homepage, (error) => {
    if (error) {
      throw error;
    }

    console.log(`${"homepage =>".red} index.html built`);
  });
}

module.exports = buildHomepage;
