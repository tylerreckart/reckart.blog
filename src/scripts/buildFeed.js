const path = require("path");
const config = require("../../site-config");
const fs = require("fs");
const xml = require("xml");
const colors = require("colors");

const { site, seo } = config;
const { url } = site;
const { title, author, description } = seo;

const outdir = path.resolve(__dirname + "../../../build");

/**
 * Build the RSS and JSON feeds and write the files to the target directory.
 *
 * @param {array} posts - The posts to be formatted.
 */
function buildFeed(posts) {
  buildJSON(posts);
  buildRSS(posts);
}

function buildJSON(posts) {
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

  fs.writeFile(`${outdir}/feed.json`, JSON.stringify(feedJSON), (error) => {
    if (error) {
      throw error;
    }

    console.log(`${"[feed:json]".green} built`);
  });
}

function buildRSS(posts) {
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

  fs.writeFile(`${outdir}/rss.xml`, xml(feedJSON), (error) => {
    if (error) {
      throw error;
    }

    console.log(`${"[feed.xml]".green} built`);
  });
}

module.exports = buildFeed;
