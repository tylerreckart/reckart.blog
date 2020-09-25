---
date: "September 25, 2020"
title: "Is it Alphabetical?"
description: "Example post description"
featuredImage: "https://images.unsplash.com/photo-1596650956793-68f12df4e549?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80"
---

I'm baby deep v occupy chillwave letterpress. Shabby chic tbh health goth
crucifix poutine whatever. Roof party letterpress tacos, single-origin coffee
taxidermy hot chicken irony vinyl beard hoodie sartorial pour-over etsy.
Snackwave vape photo booth tacos 90's prism sriracha pok pok. Bushwick freegan
vexillologist single-origin coffee man bun, humblebrag wayfarers wolf glossier
iceland.

```js
const fs = require("fs");
const fm = require("front-matter");
const marked = require("marked");
const hljs = require("highlight.js");

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(validLanguage, code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

function convertMarkdownToHTML(dir, path) {
  const data = fs.readFileSync(__dirname + `/../${dir}/${path}.md`, "utf8");
  const content = fm(data);

  return {
    ...content,
    body: marked(content.body),
    path,
  };
}

module.exports = convertMarkdownToHTML;
```

Gentrify hammock sustainable hoodie cronut, quinoa celiac taiyaki vape semiotics
direct trade actually. Heirloom prism retro taiyaki celiac distillery. Kombucha
tofu asymmetrical celiac brooklyn slow-carb franzen wolf. Gochujang synth hell
of, stumptown butcher schlitz salvia poutine. 8-bit try-hard ennui snackwave,
roof party poutine keffiyeh fixie selfies artisan prism cliche. Next level cloud
bread keytar, echo park jean shorts mlkshk unicorn. Shoreditch chartreuse
chillwave, vexillologist cliche tacos schlitz PBR&B helvetica tote bag.

Dummy text? More like dummy thicc text, amirite?
