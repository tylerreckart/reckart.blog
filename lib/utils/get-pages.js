const fs = require("fs");
const { convertPageContent } = require("./convert-markdown");

function getPages() {
  // Retrieve files in the `pages` directory and convert the content to a JSON
  // that can be rendered by the templating system.
  return fs.readdirSync(__dirname + "/../../pages").map(convertPageContent);
}

module.exports = getPages;
