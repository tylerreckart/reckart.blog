const fs = require("fs");
const { convertPostContent } = require("./convert-markdown");

function getPosts() {
  // Retrieve markdown or text files in the `posts` directory and convert the
  // content to a JSON blob sorted by the date of publication and rendered by the
  // templating system.
  return fs
    .readdirSync(__dirname + "/../../posts")
    .filter((post) => post.includes(".md") || post.includes(".txt"))
    .map(convertPostContent)
    .sort((a, b) =>
      Date.parse(a.attributes.date) < Date.parse(b.attributes.date) ? 1 : -1
    );
}

module.exports = getPosts;
