import fs from "fs";
import path from "path";

type T = {};

function getSVG(): Array<T> {
  return fs.readdirSync(path.resolve(__dirname, '../public/img'));
}

export default function getImages(): void {
    const results: Array<T> = [];

    if (!fs.existsSync(path.resolve(__dirname, `../../../build/img`))) {
      fs.mkdirSync(path.resolve(__dirname, `../../../build/img`));
    }

    results.push(...getSVG());

    results.forEach(
      (file) => fs.copyFileSync(
        path.resolve(__dirname, `../public/img/${file}`),
        path.resolve(__dirname, `../../../build/img/${file}`)
      )
    );
}
