const path = require("path");

const config = {
  outdir: path.join(__dirname, "/build"),
  theme: "mortar",
  siteConfig: {
    url: "https://reckart.blog",
    name: "reckart.blog",
    icon:
      "https://emojis.slackmojis.com/emojis/images/1549317933/5264/coding.gif?1549317933",
    intro:
      "<span role='img' aria-label='waving hand'>👋</span> Hi, I'm Tyler. I'm a software developer based in Greenville, SC working at <a class='ac' href='https://activecampaign.com' target='_blank' rel='noreferrer'>ActiveCampaign</a>. You can see my code on <a class='github' href='https://github.com/tylerreckart' target='_blank' rel='noreferrer'>Github</a>, view my photos on <a class='instagram' href='https://instagram.com/tylerreckart' target='_blank' rel='noreferrer'>Instagram</a>, or read more <a href='/about'>about me</a> if you'd like.",
  },
  seoConfig: {
    title: "Tyler Reckart",
    author: "Tyler Reckart",
    description:
      "Tyler Reckart is a software developer, watch geek, and cyclist. This is his blog.",
  },
  socialConfig: {
    twitter: "@tylerreckart",
  },
  integrations: {
    gaTrackingId: "UA-70418516-2",
  },
};

module.exports = config;
