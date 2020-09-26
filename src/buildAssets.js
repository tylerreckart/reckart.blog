const config = require("../config");
const fs = require("fs");
const colors = require("colors");

const { outdir, theme } = config;

function buildAssets() {
  const stylesheet = fs.readFileSync(
    __dirname + `/themes/${theme}/assets/css/style.css`,
    "utf8"
  );

  if (stylesheet) {
    if (!fs.existsSync(`${outdir}/css`)) {
      fs.mkdirSync(`${outdir}/css`);
    }

    fs.writeFile(`${outdir}/css/styles.css`, stylesheet, (error) => {
      if (error) {
        throw error;
      }

      console.log(`${"asset =>".magenta} styles.css built`);
    });
  }

  const jsBundle = fs.readFileSync(
    __dirname + `/themes/${theme}/assets/js/index.js`,
    "utf8"
  );

  if (jsBundle) {
    if (!fs.existsSync(`${outdir}/js`)) {
      fs.mkdirSync(`${outdir}/js`);
    }

    fs.writeFile(`${outdir}/js/bundle.js`, jsBundle, (error) => {
      if (error) {
        throw error;
      }

      console.log(`${"asset =>".magenta} bundle.js built`);
    });
  }
}

module.exports = buildAssets;
