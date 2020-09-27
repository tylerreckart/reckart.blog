const config = require("../mortar-config");
const fs = require("fs");
const colors = require("colors");
const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');
const uglifyES = require('@node-minify/uglify-es');

const { outdir, theme } = config;

function buildAssets() {
  if (!fs.existsSync(`${outdir}/css`)) {
    fs.mkdirSync(`${outdir}/css`);
  }

  minify({
    compressor: cleanCSS,
    input: __dirname + `/themes/${theme}/assets/css/style.css`,
    output: `${outdir}/css/styles.css`,
    callback: (err, min) => {
      if (err) {
        throw err;
      }
  
      console.log(`${"asset =>".magenta} styles.css built`);
    }
  });

  if (!fs.existsSync(`${outdir}/js`)) {
    fs.mkdirSync(`${outdir}/js`);
  }

  minify({
    compressor: uglifyES,
    input: __dirname + `/themes/${theme}/assets/js/index.js`,
    output: `${outdir}/js/bundle.js`,
    callback: (err, min) => {
      if (err) {
        throw err;
      }
  
      console.log(`${"asset =>".magenta} bundle.js built`);
    }
  });
}

module.exports = buildAssets;
