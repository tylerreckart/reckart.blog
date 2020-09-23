const fs = require("fs");
const fm = require("front-matter");
const marked = require("marked");

function convertMarkdownToHTML(dir, path) {
  const data = fs.readFileSync(__dirname + `/../${dir}/${path}.md`, "utf8");
  const content = fm(data);

  return {
    ...content,
    body: marked(content.body),
    path,
  };
}

module.exports = convertMarkdownToHTML;
