const config = require("../config");
const fs = require("fs");
const xml = require("xml");
const colors = require("colors");

const { outdir, siteConfig, seoConfig } = config;
const { url } = siteConfig;
const { title, description } = seoConfig;

function buildFeed(posts) {
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

  fs.writeFile(`${outdir}/feed.json`, JSON.stringify(feedJSON), (error) => {
    if (error) {
      throw error;
    }

    console.log(`${"json feed =>".green} feed.json built`);
  });

  fs.writeFile(`${outdir}/rss.xml`, xml(feedJSON), (error) => {
    if (error) {
      throw error;
    }

    console.log(`${"rss feed =>".green} rss.xml built`);
  });
}

module.exports = buildFeed;
