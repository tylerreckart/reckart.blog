const path = require("path");
const fs = require("fs");
const colors = require("colors");
const minify = require("@node-minify/core");
const cleanCSS = require("@node-minify/clean-css");
const timestamp = require("./timestamp");

const outdir = path.resolve(__dirname + "../../../build");

function buildCSS() {
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

      console.log(
        `${"[asset:styles.css]".magenta} built at ${timestamp().yellow}`
      );
    },
  });
}

module.exports = buildCSS;
