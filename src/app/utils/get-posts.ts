import fs from "fs";
import { convertPostContent } from "./convert-markdown";
import { Post as PostType } from "@src/types/post";

export default function getPosts(): Array<PostType> {
  // Retrieve markdown or text files in the `posts` directory and convert the
  // content to a JSON blob sorted by the date of publication and rendered by the
  // templating system.
  return fs
    .readdirSync(__dirname + "/../../../posts")
    .filter((post) => post.includes(".md") || post.includes(".txt"))
    .map(convertPostContent)
    .sort((a, b) =>
      Date.parse(a.attributes.date) < Date.parse(b.attributes.date) ? 1 : -1
    );
}
