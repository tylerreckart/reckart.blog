import fs from "fs";

export default function getPhotos(): Array<unknown> {
  return fs
    .readdirSync(__dirname + "/../../../photos")
    .map((file) => {
        const base64 = fs.readFileSync(__dirname + `/../../../photos/${file}`, { encoding: 'base64' });

        return { src: `data:image/jpeg;base64,${base64}` };
    });
}
