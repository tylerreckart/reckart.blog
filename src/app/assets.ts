import fs from "fs";
import colors from "colors";
/* @ts-ignore */
import minify from "@node-minify/core";
/* @ts-ignore */
import cleanCSS from "@node-minify/clean-css";
/* @ts-ignore */
import browserify from "browserify";
import uglify from "uglify-js";

async function bundleJS() {
  browserify()
    .add(`${__dirname}/public/js/index.ts`)
    .plugin("tsify", { noImplicitAny: true })
    .bundle((err): void => {
      if (err) {
        throw err;
      }

      console.log(colors.cyan("[asset] bundle.js built"));
    });
}

export default async function buildAssets(outdir: string): Promise<void> {
  if (!fs.existsSync(`${outdir}/css`)) {
    fs.mkdirSync(`${outdir}/css`);
  }

  /* Site CSS */
  minify({
    compressor: cleanCSS,
    input: `${__dirname}/public/css/style.css`,
    output: `${outdir}/css/styles.css`,
    callback: (err: string) => {
      if (err) {
        throw err;
      }

      console.log(colors.cyan("[asset] style.css built"));
    },
  });

  /* Gallery CSS */
  minify({
    compressor: cleanCSS,
    input: `${__dirname}/public/css/gallery.css`,
    output: `${outdir}/css/gallery.css`,
    callback: (err: string) => {
      if (err) {
        throw err;
      }

      console.log(colors.cyan("[asset] gallery.css built"));
    },
  });

  if (!fs.existsSync(`${outdir}/js`)) {
    fs.mkdirSync(`${outdir}/js`);
  }

  // Build JavaScript bundle.
  browserify()
    .add(`${__dirname}/public/js/index.ts`)
    .plugin("tsify", { noImplicitAny: true })
    .bundle((err, buf): void => {
      if (err) {
        throw err;
      }
      var code = uglify.minify(buf.toString()).code;
      fs.writeFileSync(`${outdir}/js/bundle.js`, code, {
        encoding: "utf8",
      });

      console.log(colors.cyan("[asset] bundle.js built"));
    });
}
