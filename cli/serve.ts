import "module-alias/register";
import path from "path";
import fs from "fs";
import express from "express";
import livereload from 'livereload';
import livereloadConenctor from 'connect-livereload';
import colors from "colors";

const outdir: string = path.join(__dirname, '../build');

// Check to see if the `build` directory exists.
if (!fs.existsSync(outdir)) {
  // If the directory does not exist, create it.
  fs.mkdirSync(outdir);
}

const livereloadServer = livereload.createServer();
livereloadServer.watch(path.join(__dirname, '../build'));

const app = express();

app.use(livereloadConenctor());
app.use(express.static("build"));

app.listen(2056, (): void =>
  console.log(
    colors.green("[express] development server running on port 2056")
  )
);

livereloadServer.server.once("connection", () => {
  setTimeout(() => {
    livereloadServer.refresh("/");
  }, 250);
});