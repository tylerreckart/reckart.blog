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
    input: __dirname + "/../public/css/style.css",
    output: `${outdir}/css/styles.css`,
    callback: (err, min) => {
      if (err) {
        throw err;
      }

      console.log(`${"[asset:styles]".magenta} built`);
    },
  });

  if (!fs.existsSync(`${outdir}/js`)) {
    fs.mkdirSync(`${outdir}/js`);
  }

  minify({
    compressor: uglifyES,
    input: __dirname + "/../public/js/index.js",
    output: `${outdir}/js/bundle.js`,
    callback: (err, min) => {
      if (err) {
        throw err;
      }

      console.log(`${"[asset:bundle]".magenta} built`);
    },
  });
}

module.exports = buildAssets;
