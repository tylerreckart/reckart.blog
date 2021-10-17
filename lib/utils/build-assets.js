const path = require("path");
const fs = require("fs");
const colors = require("colors");
const minify = require("@node-minify/core");
const cleanCSS = require("@node-minify/clean-css");
const uglifyES = require("@node-minify/uglify-es");

const outdir = path.resolve(__dirname + "../../../build");

function buildAssets() {
  if (!fs.existsSync(`${outdir}/css`)) {
    fs.mkdirSync(`${outdir}/css`);
  }

  minify({
    compressor: cleanCSS,
    input: __dirname + "/../../src/public/css/style.css",
    output: `${outdir}/css/styles.css`,
    callback: (err, min) => {
      if (err) {
        throw err;
      }

      console.log(`${"[asset:styles.css]".magenta} built`);
    },
  });

  minify({
    compressor: cleanCSS,
    input: __dirname + "/../../src/public/css/gallery.css",
    output: `${outdir}/css/gallery.css`,
    callback: (err, min) => {
      if (err) {
        throw err;
      }

      console.log(`${"[asset:styles.css]".magenta} built`);
    },
  });

  if (!fs.existsSync(`${outdir}/js`)) {
    fs.mkdirSync(`${outdir}/js`);
  }

  minify({
    compressor: uglifyES,
    input: __dirname + "/../../src/public/js/index.js",
    output: `${outdir}/js/bundle.js`,
    callback: (err, min) => {
      if (err) {
        throw err;
      }

      console.log(`${"[asset:bundle.js]".magenta} built`);
    },
  });

  minify({
    compressor: uglifyES,
    input: __dirname + "/../../src/public/js/gallery.js",
    output: `${outdir}/js/gallery.js`,
    callback: (err, min) => {
      if (err) {
        throw err;
      }

      console.log(`${"[asset:gallery.js]".magenta} built`);
    },
  });
}

module.exports = buildAssets;
