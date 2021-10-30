import config from "../../config";
import fs from "fs";
import path from "path";
import pug from "pug";

const render404page = pug.compileFile(
  path.join(`${__dirname}/../../../templates/404.pug`)
);

/**
 * Render the 404 page.
 */
export default function build404(outdir: string): void {
  const page404 = render404page({ ...config });

  fs.writeFile(`${outdir}/404.html`, page404, (error: any): void => {
    if (error) {
      throw error;
    }

    console.log(`${"[page:404]"} built`);
  });
}
