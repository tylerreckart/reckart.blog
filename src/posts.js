const fs = require("fs");

function generatePostHTML(postData) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${postData.attributes.description}" />
        <title>${postData.attributes.title}</title>
      </head>
      <body>
        <div id="content">
          <h1>${postData.attributes.title}</h1>
          ${postData.body}
        </div>
      </body>
    </html>
  `;
}

const outdir = __dirname + "/../build";

function createPosts(posts) {
  posts.forEach((post) => {
    if (! fs.existsSync(outdir)) {
      fs.mkdirSync(outdir);
    }

    if (! fs.existsSync(`${outdir}/posts`)) {
      fs.mkdirSync(`${outdir}/posts`);
    }

    if (! fs.existsSync(`${outdir}/posts/${post.path}`)) {
      fs.mkdirSync(`${outdir}/posts/${post.path}`);
    }
    
    fs.writeFile(
      `${outdir}/posts/${post.path}/index.html`,
      generatePostHTML(post),
      (error) => {
        if (error) {
          throw error;
        }
  
        console.log(`${post.path}/index.html created successfully`);
      }
    )
  })
}

module.exports = {
  createPosts,
};
