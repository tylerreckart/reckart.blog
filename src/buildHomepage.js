const config = require("../config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");
const colors = require("colors");

const renderHomepage = pug.compileFile(
  path.join(__dirname, "templates/home.pug")
);

const {
  outdir,
  siteName,
  siteIcon,
  siteIntro,
  author,
  description,
  title,
  twitterHandle,
} = config;

function buildHomepage(posts) {
  const siteConfig = {
    author,
    title,
    siteName,
    siteIcon,
    description,
    siteIntro,
    twitterHandle,
    ...posts,
  };

  fs.writeFile(`${outdir}/index.html`, renderHomepage(siteConfig), (error) => {
    if (error) {
      throw error;
    }

    console.log(`${"homepage =>".red} index.html built`);
  });
}

module.exports = buildHomepage;
