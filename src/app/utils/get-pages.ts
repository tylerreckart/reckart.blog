import fs from "fs";
import { convertPageContent } from "./convert-markdown";
import { Page as PageType } from "types/page";

export default function getPages(): Array<PageType> {
  // Retrieve files in the `pages` directory and convert the content to a JSON
  // that can be rendered by the templating system.
  return fs.readdirSync(__dirname + "/../../../pages").filter(i => i !== '.DS_Store').map(convertPageContent);
}
