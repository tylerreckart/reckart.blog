const fs = require("fs");
const fm = require("front-matter");
const marked = require("marked");
const { createPosts } = require("./posts");
const { createPages } = require("./pages");

function formatMarkdown(dir, path) {
  const data = fs.readFileSync(__dirname + `/../${dir}/${path}.md`, "utf8");
  const content = fm(data);

  return {
    ...content,
    body: marked(content.body),
    path,
  };
}

const posts = fs
  .readdirSync(__dirname + "/../posts")
  .map((post) => formatMarkdown("posts", post.split('.')[0]));

createPosts(posts);

const pages = fs
  .readdirSync(__dirname + "/../pages")
  .map((page) => formatMarkdown("pages", page.split('.')[0]));

function generateHeaderHTML(pages) {
  const links = pages.map((page) =>
    '<a href="/' + page.path + '">' + page.attributes.title + '</a>'
  );

  return `
    <header>
      <a href="/">Home</a>
      ${links}
    </header>
  `;
}

const header = generateHeaderHTML(pages);

console.log(header);

createPages(pages);
