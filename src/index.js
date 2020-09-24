const config = require("./config");
const fs = require("fs");
const convertMarkdownToHTML = require("./md");
const { createHomepage } = require("./home");
const { createPosts } = require("./posts");
const { createPages } = require("./pages");

const { outdir } = config;

// Check to see if the `build` directory exists.
if (! fs.existsSync(outdir)) {
  // If the directory does not exist, create it.
  fs.mkdirSync(outdir);
}

const stylesheet = fs.readFileSync(__dirname + "/assets/css/style.css", "utf8");

if (stylesheet) {
  if (! fs.existsSync(`${outdir}/css`)) {
    fs.mkdirSync(`${outdir}/css`);
  }

  fs.writeFile(
    `${outdir}/css/styles.css`,
    stylesheet,
    (error) => {
      if (error) {
        throw error;
      }

      console.log(`stylesheet built`);
    }
  );
}

const posts = fs
  .readdirSync(__dirname + "/../posts")
  .filter((post) => post.includes('.md'))
  .map((post) => convertMarkdownToHTML("posts", post.split('.')[0]));

const pages = fs
  .readdirSync(__dirname + "/../pages")
  .map((page) => convertMarkdownToHTML("pages", page.split('.')[0]));

createHomepage({ posts });
createPosts(posts);
createPages(pages);
  

