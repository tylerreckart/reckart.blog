const fs = require("fs");

function generatePageHTML(pageData) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${pageData.attributes.description}" />
        <title>${pageData.attributes.title}</title>
      </head>
      <body>
        <div id="content">
          <h1>${pageData.attributes.title}</h1>
          ${pageData.body}
        </div>
      </body>
    </html>
  `;
}

const outdir = __dirname + "/../build";

function createPages(pages) {
  pages.forEach((page) => {
    if (! fs.existsSync(outdir)) {
      fs.mkdirSync(outdir);
    }

    if (! fs.existsSync(`${outdir}/pages`)) {
      fs.mkdirSync(`${outdir}/pages`);
    }

    if (! fs.existsSync(`${outdir}/pages/${page.path}`)) {
      fs.mkdirSync(`${outdir}/pages/${page.path}`);
    }
    
    fs.writeFile(
      `${outdir}/pages/${page.path}/index.html`,
      generatePageHTML(page),
      (error) => {
        if (error) {
          throw error;
        }
  
        console.log(`${page.path}/index.html created successfully`);
      }
    )
  })
}

module.exports = {
  createPages,
};
