const config = require("./config");
const fs = require("fs");

const { outdir } = config;

function buildAssets() {
  const stylesheet = fs.readFileSync(
    __dirname + "/assets/css/style.css",
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

      console.log(`stylesheet built`);
    });
  }

  const jsBundle = fs.readFileSync(__dirname + "/assets/js/index.js", "utf8");

  if (jsBundle) {
    if (!fs.existsSync(`${outdir}/js`)) {
      fs.mkdirSync(`${outdir}/js`);
    }

    fs.writeFile(`${outdir}/js/bundle.js`, jsBundle, (error) => {
      if (error) {
        throw error;
      }

      console.log(`JS bundle built`);
    });
  }
}

module.exports = {
  buildAssets,
};
