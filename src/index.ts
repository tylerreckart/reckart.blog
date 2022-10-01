import "module-alias/register";
import path from "path";
import fs from "fs";
import colors from "colors";
import buildArchive from "@app/routes/archive";
import buildAssets from "@app/assets";
import buildPages from "@app/page";
import buildPosts from "@app/post";
import buildHome from "@app/routes/home";
import buildFeed from "@app/feed";
import build404 from "@app/routes/404";
import buildPhotoGallery from "@app/routes/photos";
import buildGalleries from "@app/gallery";
import getPosts from "@app/utils/get-posts";
import getPages from "@app/utils/get-pages";
import { Post as PostType } from "@src/types/post";
import { Page as PageType } from "@src/types/page";

const outdir: string = path.resolve(`${__dirname}/../build`);

// Check to see if the `build` directory exists.
if (!fs.existsSync(outdir)) {
  // If the directory does not exist, create it.
  fs.mkdirSync(outdir);
}

const posts: Array<PostType> = getPosts();
const pages: Array<PageType> = getPages();

type GalleryImage = {
  title: string;
  location?: string;
  year: number;
  src: string;
}

type PhotoGallery = {
  title: string;
  path: string;
  colophon: string;
  featuredImage: string;
  images: GalleryImage[];
}

const gallery: PhotoGallery[] = [
  {
    title: 'Small Scenes',
    path: 'small-scenes',
    colophon: '<p>Much of my photography focuses on smaller, intimate scenes. These images represent scenes that may often be overlooked.</p><p>These subjects may not be off the beaten path.</p><button class="contact-button">Contact for Pricing</button>',
    featuredImage: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/intimate-nature/thumbnail.jpg',
    images: [
      { title: 'Hyacinth Leaves at Sunrise', location: 'Conestee Nature Preserve', year: 2022, src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/hyacinth.jpg' },
      { title: 'In The Shadow of Giants', location: 'Conestee Nature Preserve', year: 2022, src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/intimate-nature/L1004270-min.jpg' },
      { title: 'New Life', location: 'Great Smoky Mountains National Park', year: 2022, src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/intimate-nature/new_life.jpg' },
      { title: 'Untitled', location: 'Conestee Nature Preserve', year: 2022, src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/intimate-nature/leaf_scene_2-Edit-min.jpg' },
      { title: 'Divisions', location: 'Conestee Nature Preserve', year: 2022, src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/intimate-nature/000474390012-Edit-min.jpg' }
    ],
  },
  {
    title: 'Land & Sea',
    path: 'land-and-sea',
    colophon: '',
    featuredImage: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/land-and-sea/thumnail.jpg',
    images: [
      { title: 'Disillusion', location: 'South Carolina', year: 2022, src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/disillusion.jpg' },
    ]
  },
  {
    title: 'Brick & Stone',
    path: 'brick-and-stone',
    colophon: '',
    featuredImage: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/brick-and-stone/thumbnail.jpg',
    images: [
      { title: 'Disillusion', location: 'South Carolina', year: 2022, src: 'https://s3.us-east-2.amazonaws.com/reckart.blog-images/disillusion.jpg' },
    ],
  }
];

export function bundleAssets(): void {
  try {
    console.log(colors.yellow("[bundle] building..."));

    // build static assets
    buildAssets(outdir);
    // build pages
    buildHome(posts, outdir);
    buildArchive(posts, outdir);
    buildPosts(posts, outdir);
    buildPages(pages, outdir);
    buildPhotoGallery(gallery, outdir);
    buildGalleries(gallery, outdir);
    // rss/json feeds
    buildFeed(posts, outdir);
    // 404 page
    build404(outdir);
  } catch (error) {
    console.log(colors.red("[bundle] build failed"));
    console.error(error);

    return;
  }
}
