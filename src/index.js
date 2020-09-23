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

const bundle = fs.readFileSync(__dirname + "/assets/js/index.js", "utf8");

if (bundle) {
  fs.writeFile(
    `${outdir}/bundle.min.js`,
    bundle,
    (error) => {
      if (error) {
        throw error;
      }

      console.log(`bundle.min.js built`);
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
  

