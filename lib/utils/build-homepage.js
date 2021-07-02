const config = require("../../site-config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

const outdir = path.resolve(__dirname + "../../../build");

const renderHomepage = pug.compileFile(
  path.join(__dirname, "../../src/templates/home.pug")
);

/**
 * Render the homepage.
 *
 * @param {object} post - The most recent post to be rendered.
 */
function buildHomepage(posts) {
  const homepage = renderHomepage({
    posts: [
      {
        ...posts[0],
        body: `<p>${posts[0].attributes.description}</p>`,
      },
      {
        ...posts[1],
        body: `<p>${posts[1].attributes.description}</p>`,
      },
    ],
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
