const config = require("./config");
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

const { outdir } = config;

// Check to see if the `build` directory exists.
if (! fs.existsSync(outdir)) {
  // If the directory does not exist, create it.
  fs.mkdirSync(outdir);
}

const bundle = fs.readFileSync(__dirname + "/bundle.js", "utf8");

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
  .map((post) => formatMarkdown("posts", post.split('.')[0]));

createPosts(posts);

const pages = fs
  .readdirSync(__dirname + "/../pages")
  .map((page) => formatMarkdown("pages", page.split('.')[0]));

createPages(pages);
