const config = require("./config");
const fs = require("fs");
const convertMarkdownToHTML = require("./convertMarkdown");
const { buildAssets } = require("./buildAssets");
const { buildPages } = require("./buildPages");
const { buildPosts } = require("./buildPosts");
const { buildHomepage } = require("./buildHomepage");

const { outdir } = config;

// Check to see if the `build` directory exists.
if (!fs.existsSync(outdir)) {
  // If the directory does not exist, create it.
  fs.mkdirSync(outdir);
}
const posts = fs
  .readdirSync(__dirname + "/../posts")
  .filter((post) => post.includes(".md"))
  .map((post) => convertMarkdownToHTML("posts", post.split(".")[0]));

const sortedPosts = posts.sort((a, b) =>
  Date.parse(a.attributes.date) < Date.parse(b.attributes.date) ? 1 : -1
);

const pages = fs
  .readdirSync(__dirname + "/../pages")
  .map((page) => convertMarkdownToHTML("pages", page.split(".")[0]));

buildAssets();
buildHomepage({ posts: sortedPosts });
buildPosts(posts);
buildPages(pages);
