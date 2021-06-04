const path = require("path");
const fs = require("fs");
const {
  convertPostContent,
  convertPageContent,
} = require("./scripts/convertMarkdown");
const buildAssets = require("./scripts/buildAssets");
const buildPages = require("./scripts/buildPages");
const buildPosts = require("./scripts/buildPosts");
const buildHomepage = require("./scripts/buildHomepage");
const buildGallery = require("./scripts/buildGallery");
const buildFeed = require("./scripts/buildFeed");

const outdir = path.resolve(__dirname + "../../build");

// Check to see if the `build` directory exists.
if (!fs.existsSync(outdir)) {
  // If the directory does not exist, create it.
  fs.mkdirSync(outdir);
}

// Retrieve markdown or text files in the `posts` directory and convert the
// content to a JSON blob sorted by the date of publication and rendered by the
// templating system.
const posts = fs
  .readdirSync(__dirname + "/../posts")
  .filter((post) => post.includes(".md") || post.includes(".txt"))
  .map(convertPostContent)
  .sort((a, b) =>
    Date.parse(a.attributes.date) < Date.parse(b.attributes.date) ? 1 : -1
  );

// Retrieve files in the `pages` directory and convert the content to a JSON
// that can be rendered by the templating system.
const pages = fs.readdirSync(__dirname + "/../pages").map(convertPageContent);

// Retrieve files in the `photos` directory and convert the content to a JSON
// blob that can be rendered by the templating system.
const photos = JSON.parse(fs.readFileSync(__dirname + "/../photos/map.json"));

buildAssets();
buildHomepage({ posts });
buildGallery(photos);
buildPosts(posts);
buildFeed(posts);
buildPages(pages);
