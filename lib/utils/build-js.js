const path = require("path");
const fs = require("fs");
const colors = require("colors");
const uglifyES = require("@node-minify/uglify-es");
const timestamp = require("timestamp");

const outdir = path.resolve(__dirname + "../../../build");

function buildJS() {
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

      console.log(
        `${"[asset:bundle.js]".magenta} built at ${timestamp().yellow}`
      );
    },
  });
}

module.exports = buildJS;
