import path from "path";
import fs from "fs";
import {
  convertPostContent,
  convertPageContent,
} from "./build/utils/convert-markdown";
import buildAssets from "./build/assets";
import buildPages from "./build/page";
import buildPosts from "./build/post";
import buildHomepage from "./build/routes/home";
import buildBlog from "./build/routes/blog";
import buildGallery from "./build/routes/gallery";
import buildFeed from "./build/feed";
import { Post as PostType } from "./types/post.types";

const base: string = __dirname;
const outdir: string = path.resolve(`${base}../../build`);

// Check to see if the `build` directory exists.
if (!fs.existsSync(outdir)) {
  // If the directory does not exist, create it.
  fs.mkdirSync(outdir);
}

// Retrieve markdown or text files in the `posts` directory and convert the
// content to a JSON blob sorted by the date of publication and rendered by the
// templating system.
const posts = fs
  .readdirSync(`${base}/../../posts`)
  .filter((post: string) => post.includes(".md") || post.includes(".txt"))
  .map(convertPostContent)
  .sort((a: PostType, b: PostType) =>
    Date.parse(a.attributes.date) < Date.parse(b.attributes.date) ? 1 : -1
  );

// Retrieve files in the `pages` directory and convert the content to a JSON
// that can be rendered by the templating system.
// const pages = fs.readdirSync(`${base}/../../pages`).map(convertPageContent);

buildAssets();
buildHomepage(posts);
buildBlog(posts);
buildPosts(posts);
buildFeed(posts);
buildPages();
buildGallery();
