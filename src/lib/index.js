"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var convert_markdown_1 = require("./build/utils/convert-markdown");
var assets_1 = __importDefault(require("./build/assets"));
var page_1 = __importDefault(require("./build/page"));
var post_1 = __importDefault(require("./build/post"));
var home_1 = __importDefault(require("./build/routes/home"));
var blog_1 = __importDefault(require("./build/routes/blog"));
var gallery_1 = __importDefault(require("./build/routes/gallery"));
var feed_1 = __importDefault(require("./build/feed"));
var base = __dirname;
var outdir = path_1.default.resolve(base + "../../build");
// Check to see if the `build` directory exists.
if (!fs_1.default.existsSync(outdir)) {
    // If the directory does not exist, create it.
    fs_1.default.mkdirSync(outdir);
}
// Retrieve markdown or text files in the `posts` directory and convert the
// content to a JSON blob sorted by the date of publication and rendered by the
// templating system.
var posts = fs_1.default
    .readdirSync(base + "/../../posts")
    .filter(function (post) { return post.includes(".md") || post.includes(".txt"); })
    .map(convert_markdown_1.convertPostContent)
    .sort(function (a, b) {
    return Date.parse(a.attributes.date) < Date.parse(b.attributes.date) ? 1 : -1;
});
// Retrieve files in the `pages` directory and convert the content to a JSON
// that can be rendered by the templating system.
// const pages = fs.readdirSync(`${base}/../../pages`).map(convertPageContent);
(0, assets_1.default)();
(0, home_1.default)(posts);
(0, blog_1.default)(posts);
(0, post_1.default)(posts);
(0, feed_1.default)(posts);
(0, page_1.default)();
(0, gallery_1.default)();
