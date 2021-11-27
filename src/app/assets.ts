import fs from "fs";
import colors from "colors";
/* @ts-ignore */
import minify from "@node-minify/core";
/* @ts-ignore */
import cleanCSS from "@node-minify/clean-css";
/* @ts-ignore */
import uglifyES from "@node-minify/uglify-es";

export default function buildAssets(outdir: string): void {
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

  /* Site JS bundle */
  minify({
    compressor: uglifyES,
    input: `${__dirname}/public/js/index.js`,
    output: `${outdir}/js/bundle.js`,
    callback: (err: string) => {
      if (err) {
        throw err;
      }

      console.log(colors.cyan("[asset] bundle.js built"));
    },
  });

  /* Gallery JS bundle */
  minify({
    compressor: uglifyES,
    input: `${__dirname}/public/js/gallery.js`,
    output: `${outdir}/js/gallery.js`,
    callback: (err: string) => {
      if (err) {
        throw err;
      }

      console.log(colors.cyan("[asset] gallery.js built"));
    },
  });
}
