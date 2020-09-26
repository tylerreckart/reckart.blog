const path = require("path");

const config = {
  outdir: path.join(__dirname, "/build"),
  siteUrl: "https://reckart.blog",
  siteName: "reckart.blog",
  siteIcon:
    "https://emojis.slackmojis.com/emojis/images/1549317933/5264/coding.gif?1549317933",
  siteIntro:
    "<span role='img' aria-label='waving hand'>👋</spam> Hi, I'm Tyler. I'm a software developer based in Greenville, SC working at <a class='alley' href='https://alley.co' target='_blank' rel='noreferrer'>Alley</a>. You can see my code on <a class='github' href='https://github.com/tylerreckart' target='_blank' rel='noreferrer'>Github</a>, view my photos on <a class='instagram' href='https://instagram.com/tylerreckart' target='_blank' rel='noreferrer'>Instagram</a>, or read more <a href='/about'>about me</a> if you'd like.",
  title: "Tyler Reckart",
  author: "Tyler Reckart",
  twitterHandle: "@tylerreckart",
  description:
    "Tyler Reckart is a software developer, watch geek, and cyclist. This is his blog.",
};

module.exports = config;
