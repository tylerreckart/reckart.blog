const config = require("../config");
const fs = require("fs");
const {
  convertPostContent,
  convertPageContent,
} = require("./convertMarkdown");
const buildAssets = require("./buildAssets");
const buildPages = require("./buildPages");
const buildPosts = require("./buildPosts");
const buildHomepage = require("./buildHomepage");
const buildFeed = require("./buildFeed");

const { outdir } = config;

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

buildAssets();
buildHomepage({ posts });
buildPosts(posts);
buildFeed(posts);
buildPages(pages);
