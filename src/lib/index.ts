import path from "path";
import fs from "fs";
import buildAssets from "./compile/assets";
import buildPages from "./compile/page";
import buildPosts from "./compile/post";
import buildHome from "./compile/routes/home";
import buildBlog from "./compile/routes/blog";
import buildGallery from "./compile/routes/gallery";
import buildFeed from "./compile/feed";
import getPosts from "./compile/utils/get-posts";
import getPages from "./compile/utils/get-pages";
import { Post as PostType } from "./types/post.types";
import { Page as PageType } from "./types/page.types";

const outdir: string = path.resolve(`${__dirname}/../../build`);

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
