const path = require("path");
const open = require("open");
const colors = require("colors");
const express = require("express");
const chokidar = require("chokidar");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const getPages = require("./utils/get-pages");
const getPosts = require("./utils/get-posts");
const buildPages = require("./utils/build-pages");
const buildPosts = require("./utils/build-posts");
const buildFeed = require("./utils/build-feed");
const buildAssets = require("./utils/build-assets");
const buildHomepage = require("./utils/build-homepage");
const buildBlog = require("./utils/build-blog");

const app = express();

const reloadServer = livereload.createServer();
reloadServer.watch(path.resolve(__dirname, "/../build"));

app.use(express.static("build"));
app.use(connectLivereload());

app.listen(2056);

console.log(`${"[listening:2056]".green}`);

setTimeout(() => {
  open("http://localhost:2056");
}, 1000);

function buildTemplates() {
  const pages = getPages();
  const posts = getPosts();

  buildAssets();
  buildHomepage(posts);
  buildBlog(posts);
  buildPosts(posts);
  buildFeed(posts);
  buildPages(pages);
}

var templateWatcher = chokidar.watch(
  path.resolve(__dirname + "/../src/templates"),
  { ignored: /^\./, persistent: true }
);

templateWatcher
  .on("change", (path) => {
    console.log(path + " changed");
    buildTemplates();
    open("http://localhost:2056");
  })
  .on("error", (path) => {
    console.error(error);
  });

var assetWatcher = chokidar.watch(path.resolve(__dirname + "/../src/public"), {
  ignored: /^\./,
  persistent: true,
});

assetWatcher
  .on("change", (path) => {
    console.log(path + " changed");
    buildAssets();
    open("http://localhost:2056");
  })
  .on("error", (path) => {
    console.error(error);
  });
