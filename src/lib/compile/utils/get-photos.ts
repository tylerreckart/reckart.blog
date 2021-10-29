import fs from "fs";

type ImageData = {
  name: string;
  alt: string;
  description: string;
};

export default function getPhotos(dir: string) {
  const path = `${__dirname}/../../../../photos/${dir}`;
  const { photos: map } = JSON.parse(
    fs.readFileSync(`${path}/map.json`).toString()
  );

  return fs
    .readdirSync(path)
    .map((img) => {
      if (img.charAt(0) !== "." && !img.includes(".json")) {
        const file = fs.readFileSync(`${path}/${img}`);
        const buffer = Buffer.from(file).toString("base64");
        const { alt, description } = map.find((i: ImageData) =>
          i.name.includes(img.toString())
        );

        return {
          src: `data:image/jpeg;base64,${buffer}`,
          alt,
          description,
        };
      }
    })
    .filter((i) => i !== undefined);
}
