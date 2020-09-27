const fs = require("fs");
const fm = require("front-matter");
const marked = require("marked");
const hljs = require("highlight.js");

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(validLanguage, code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

/**
 * Retrieve the content of a markdown file in a specified directory and convert
 * the content into a JSON blob that can be rendered by the templating system.
 *
 * @param {string} dir - The target directory.
 * @param {string} path - The target file name.
 *
 * @returns {object} The converted content.
 */
function convertMarkdownToHTML(dir, path) {
  const data = fs.readFileSync(__dirname + `/../${dir}/${path}.md`, "utf8");
  const content = fm(data);

  return {
    ...content,
    body: marked(content.body),
    path,
  };
}

/**
 * Convert markdown files in the `posts` directory to HTML templates.
 *
 * @param {string} post - The post to be converted.
 *
 * @returns {object} The converted post content.
 */
function convertPostContent(post) {
  return convertMarkdownToHTML("posts", post.split(".")[0]);
}

/**
 * Convert markdown files in the `pages` directory to HTML templates.
 *
 * @param {string} page - The page to be converted.
 *
 * @returns {object} The converted page content.
 */
function convertPageContent(page) {
  return convertMarkdownToHTML("pages", page.split(".")[0]);
}

module.exports = {
  convertPostContent,
  convertPageContent,
};
