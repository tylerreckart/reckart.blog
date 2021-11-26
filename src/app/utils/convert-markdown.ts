import fs from "fs";
import fm from "front-matter";
import marked from "marked";
import hljs from "highlight.js";
import { Post as PostType } from "@src/types/post.types";
import { Page as PageType } from "@src/types/page.types";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(validLanguage, code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

/**
 * Retrieve the content of a markdown file in a specified directory and convert
 * the content into a JSON blob that can be rendered by the templating system.
 */
function convertMarkdownToHTML(dir: string, path: string): any {
  const data = fs.readFileSync(
    __dirname + `/../../../${dir}/${path}.md`,
    "utf8"
  );
  const content = fm(data);

  return {
    ...content,
    body: marked(content.body),
    path,
  };
}

/**
 * Convert markdown files in the `posts` directory to HTML templates.
 *
 * @param {string} post - The post to be converted.
 *
 * @returns {object} The converted post content.
 */
export function convertPostContent(target: string): PostType {
  return convertMarkdownToHTML("posts", target.split(".")[0]);
}

/**
 * Convert markdown files in the `pages` directory to HTML templates.
 */
export function convertPageContent(target: string): PageType {
  return convertMarkdownToHTML("pages", target.split(".")[0]);
}
