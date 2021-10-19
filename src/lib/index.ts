import path from "path";
import fs from "fs";
import buildAssets from "./build/assets";
import buildPages from "./build/page";
import buildPosts from "./build/post";
import buildHome from "./build/routes/home";
import buildBlog from "./build/routes/blog";
import buildGallery from "./build/routes/gallery";
import buildFeed from "./build/feed";
import getPosts from "./build/utils/get-posts";
import getPages from "./build/utils/get-pages";
import { Post as PostType } from "./types/post.types";
import { Page as PageType } from "./types/page.types";

const outdir: string = path.resolve(`${__dirname}../../build`);

// Check to see if the `build` directory exists.
if (!fs.existsSync(outdir)) {
  // If the directory does not exist, create it.
  fs.mkdirSync(outdir);
}

const posts: Array<PostType> = getPosts();
const pages: Array<PageType> = getPages();

try {
  // build static assets
  buildAssets(outdir);
  // build pages
  buildHome(posts, outdir);
  buildBlog(posts, outdir);
  buildPosts(posts, outdir);
  buildPages(pages, outdir);
  buildGallery(outdir);
  // rss/json feeds
  buildFeed(posts, outdir);
} catch (error) {
  console.error(error);
}
