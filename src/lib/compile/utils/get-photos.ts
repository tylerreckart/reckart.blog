import fs from "fs";

export default function getPhotos(dir: string) {
  // Retrieve files in the `pages` directory and convert the content to a JSON
  // that can be rendered by the templating system.
  return fs.readdirSync(`${__dirname}/../../../../photos/${dir}`).map((img) => {
    const file = fs.readFileSync(
      `${__dirname}/../../../../photos/${dir}/${img}`
    );
    const buffer = Buffer.from(file).toString("base64");
    return {
      src: `data:image/jpeg;base64,${buffer}`,
    };
  });
}
