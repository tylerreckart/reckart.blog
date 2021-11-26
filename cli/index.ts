import express from "express";
import open from "open";
import chokidar from "chokidar";

const watcher = chokidar.watch("../src/");

watcher.on("ready", (): void => {
  watcher.on("all", (): void => {
    console.log("[express] reloading server...");

    Object.keys(require.cache).forEach((id: string): void => {
      const localId = id.substr(process.cwd().length);

      if (
        !localId.match(/^\/src\//) ||
        !localId.match(/^\/pages\//) ||
        !localId.match(/^\/posts\//) ||
        !localId.match(/^\/photos\//)
      ) {
        return;
      }

      delete require.cache[id];
    });

    console.log("[express] server reloaded");
  });
});

const app = express();

app.use(express.static("build"));

app.use((req, res, next) => {
  require("../src")(req, res, next);
  require("../pages")(req, res, next);
  require("../posts")(req, res, next);
  require("../photos")(req, res, next);
});

app.listen(2056);

console.log(`${"[express] development server running on port 2056"}`);

setTimeout(() => {
  open("http://localhost:2056");
}, 1000);
