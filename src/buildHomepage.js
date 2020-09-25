const config = require("../config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");
const colors = require("colors");

const renderHomepage = pug.compileFile(
  path.join(__dirname, "templates/home.pug")
);

const { outdir, sitename, description, title } = config;

function buildHomepage(posts) {
  const siteConfig = {
    title,
    sitename,
    description,
    ...posts,
  };

  console.log(siteConfig);

  fs.writeFile(`${outdir}/index.html`, renderHomepage(siteConfig), (error) => {
    if (error) {
      throw error;
    }

    console.log(`${"homepage =>".red} index.html built`);
  });
}

module.exports = buildHomepage;
