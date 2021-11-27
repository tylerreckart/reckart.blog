import "module-alias/register";
import path from "path";
import fs from "fs";
import colors from "colors";
import buildAssets from "@app/assets";
import buildPages from "@app/page";
import buildPosts from "@app/post";
import buildHome from "@app/routes/home";
import buildBlog from "@app/routes/blog";
import buildGallery from "@app/routes/gallery";
import buildFeed from "@app/feed";
import build404 from "@app/routes/404";
import getPosts from "@app/utils/get-posts";
import getPages from "@app/utils/get-pages";
import { Post as PostType } from "@src/types/post.types";
import { Page as PageType } from "@src/types/page.types";

const outdir: string = path.resolve(`${__dirname}/../build`);

// Check to see if the `build` directory exists.
if (!fs.existsSync(outdir)) {
  // If the directory does not exist, create it.
  fs.mkdirSync(outdir);
}

const posts: Array<PostType> = getPosts();
const pages: Array<PageType> = getPages();

export function bundleAssets(): void {
  try {
    console.log(colors.yellow("[bundle] building..."));

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
    // 404 page
    build404(outdir);

    setTimeout(() => {
      console.log(colors.yellow("[bundle] finished"));
    }, 50);
  } catch (error) {
    console.log(colors.red("[bundle] build failed"));
    console.error(error);

    return;
  }
}
