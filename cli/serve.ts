import "module-alias/register";
import path from "path";
import fs from "fs";
import express from "express";
import open from "open";
import colors from "colors";
import { bundleAssets } from "../src";

const outdir: string = path.resolve(`${__dirname}/../build`);

// Check to see if the `build` directory exists.
if (!fs.existsSync(outdir)) {
  // If the directory does not exist, create it.
  fs.mkdirSync(outdir);
}

const app = express();

function startServer(): void {
  app.use(express.static("build"));

  app.listen(2056, (): void =>
    console.log(
      colors.green("[express] development server running on port 2056")
    )
  );

  setTimeout(() => {
    open("http://localhost:2056");
  }, 1000);
}

function main(): void {
  bundleAssets();

  setTimeout((): void => {
    startServer();
  }, 250);
}

main();
