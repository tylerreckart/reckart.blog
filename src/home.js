const config = require("./config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

const renderHomepage = pug.compileFile(
  path.join(__dirname, "templates/home.pug")
);

const { outdir } = config;

function createHomepage(posts) {  
  fs.writeFile(
    `${outdir}/index.html`,
    renderHomepage(posts),
    (error) => {
      if (error) {
        throw error;
      }

      console.log(`index.html built`);
    }
  )
}

module.exports = {
  createHomepage,
};
