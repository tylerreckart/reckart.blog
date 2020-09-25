const path = require("path");

const config = {
  outdir: path.join(__dirname, "/build"),
  siteurl: "https://reckart.blog",
  sitename: "reckart.blog",
  title: "Tyler Reckart",
  author: "Tyler Reckart",
  twitterHandle: "@tylerreckart",
  description:
    "Tyler Reckart is a software developer, watch geek, and cyclist. This is his blog.",
};

module.exports = config;
