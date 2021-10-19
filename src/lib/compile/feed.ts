import config from "../config";
import fs from "fs";
import xml from "xml";
import { Post as PostType } from "../types/post.types";

const { site, seo } = config;
const { url } = site;
const { title, author, description } = seo;

function buildJSON(posts: Array<PostType>, outdir: string): void {
  const feedJSON = {
    version: "https://jsonfeed.org/version/1",
    title,
    description,
    home_page_url: url,
    feed_url: `${url}/feed.json`,
    author: {
      name: author,
      url: url,
    },
    items: [
      ...posts.map((post) => ({
        id: `${url}/${post.path}`,
        url: `${url}/${post.path}`,
        title: post.attributes.title,
        content_html: post.body,
      })),
    ],
  };

  fs.writeFile(
    `${outdir}/feed.json`,
    JSON.stringify(feedJSON),
    (error: any): void => {
      if (error) {
        throw error;
      }

      console.log(`${"[feed:json]"} built`);
    }
  );
}

function buildRSS(posts: Array<PostType>, outdir: string): void {
  const feedJSON = {
    rss: [
      {
        _attr: {
          version: "2.0",
          "xmlns:atom": "http://www.w3.org/2005/atom",
        },
      },
      {
        channel: [
          {
            "atom:link": {
              _attr: {
                href: `${url}/feed.rss`,
                rel: "self",
                type: "application/rss+xml",
              },
            },
          },
          { title },
          { link: url },
          { description },
          { language: "en-us" },
          ...posts.map((post) => {
            const absoluteUrl = `${url}/${post.path}`;

            return {
              item: [
                { title: post.attributes.title },
                {
                  pubDate: new Date(
                    Date.parse(post.attributes.date)
                  ).toUTCString(),
                },
                { link: absoluteUrl },
                { guid: absoluteUrl },
                { description: { _cdata: post.body } },
              ],
            };
          }),
        ],
      },
    ],
  };

  fs.writeFile(`${outdir}/rss.xml`, xml(feedJSON), (error: any): void => {
    if (error) {
      throw error;
    }

    console.log(`${"[feed.xml]"} built`);
  });
}

/**
 * Build the RSS and JSON feeds and write the files to the target directory.
 *
 * @param {array} posts - The posts to be formatted.
 */
export default function buildFeed(
  posts: Array<PostType>,
  outdir: string
): void {
  try {
    buildJSON(posts, outdir);
    buildRSS(posts, outdir);
  } catch (error) {
    console.error(error);
  }
}
