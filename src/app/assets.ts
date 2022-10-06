import fs from "fs";
import colors from "colors";
/* @ts-ignore */
import minify from "@node-minify/core";
/* @ts-ignore */
import cleanCSS from "@node-minify/clean-css";
/* @ts-ignore */
import browserify from "browserify";
import uglify from "uglify-js";

export default function buildAssets(outdir: string): void {
  if (!fs.existsSync(`${outdir}/css`)) {
    fs.mkdirSync(`${outdir}/css`);
  }

  /* Site CSS */
  let cssString = '';

  minify({
    compressor: cleanCSS,
    input: `${__dirname}/public/css/**/*.css`,
    output: `${outdir}/css/styles.css`,
    callback: (err: string, min: string) => {
      if (err) {
        throw err;
      } else {
        cssString += min
      }

      console.log(colors.cyan("[asset] style.css built"));
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
      const code = uglify.minify(buf.toString()).code;
      fs.writeFileSync(`${outdir}/js/bundle.js`, code, {
        encoding: "utf8",
      });

      console.log(colors.cyan("[asset] bundle.js built"));
    });
}
