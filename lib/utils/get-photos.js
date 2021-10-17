const fs = require("fs");

function getPhotos(dir) {
  // Retrieve files in the `pages` directory and convert the content to a JSON
  // that can be rendered by the templating system.
  return fs.readdirSync(`${__dirname}/../../photos/${dir}`).map((img) => {
    const file = fs.readFileSync(`${__dirname}/../../photos/${dir}/${img}`);
    const buffer = Buffer.from(file).toString("base64");
    return `<img class="grid--item" src="data:image/jpeg;base64,${buffer}" />`;
  });
}

module.exports = getPhotos;
