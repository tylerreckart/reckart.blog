import fs from "fs";

export default function getPhotos(dir: string) {
  const path = `${__dirname}/../../../../photos/${dir}`;
  // Retrieve files in the `pages` directory and convert the content to a JSON
  // that can be rendered by the templating system.
  return fs
    .readdirSync(path)
    .map((img) => {
      if (img.charAt(0) !== ".") {
        const file = fs.readFileSync(`${path}/${img}`);
        const buffer = Buffer.from(file).toString("base64");

        return {
          src: `data:image/jpeg;base64,${buffer}`,
        };
      }
    })
    .filter((i) => i !== undefined);
}
