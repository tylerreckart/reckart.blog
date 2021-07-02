const config = require("../../site-config");
const fs = require("fs");
const path = require("path");
const pug = require("pug");

const outdir = path.resolve(__dirname + "../../../build");

const renderGallery = pug.compileFile(
  path.join(__dirname, "../../src/templates/gallery.pug")
);

/**
 * Render the gallery.
 *
 * @param {array} photos - The photos to be rendered.
 */
function buildGallery(photos) {
  const gallery = renderGallery({
    ...photos,
    ...config,
  });

  if (!fs.existsSync(`${outdir}/gallery`)) {
    fs.mkdirSync(`${outdir}/gallery`);
  }

  fs.writeFile(`${outdir}/gallery/index.html`, gallery, (error) => {
    if (error) {
      throw error;
    }

    console.log(`${"[page:gallery]".red} built`);
  });
}

module.exports = buildGallery;
