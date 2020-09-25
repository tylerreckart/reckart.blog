const config = require("./config");
const fs = require("fs");
const convertMarkdownToHTML = require("./convertMarkdown");
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

function convertPostContent(post) {
  return convertMarkdownToHTML("posts", post.split(".")[0]);
}

function convertPageContent(page) {
  return convertMarkdownToHTML("pages", page.split(".")[0]);
}

function sortPostsByDate(a, b) {
  return Date.parse(a.attributes.date) < Date.parse(b.attributes.date) ? 1 : -1;
}

buildAssets();

const posts = fs
  .readdirSync(__dirname + "/../posts")
  .filter((post) => post.includes(".md"))
  .map(convertPostContent)
  .sort(sortPostsByDate);

buildHomepage({ posts });
buildPosts(posts);
buildFeed(posts);

const pages = fs.readdirSync(__dirname + "/../pages").map(convertPageContent);

buildPages(pages);
