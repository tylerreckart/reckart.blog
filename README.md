# [rkrt.net](https://rkrt.net)  
This repository serves as the foundation for my blog. It is comprised of a simple static site generator written in TypeScript and a [pug](https://pugjs.org/api/getting-started.html)-based templating system. It takes markdown content placed in the `posts` and `pages` directories, pipes them through the templating system and builds a complete, static website ready to be served by any web server.

### Commands
Install dependencies:
```sh
npm install
```

Output the static HTML, JavaScript, and CSS bundles into the `build` directory:
```sh
npm run build:static
```

Run an express hot-reload development server that watches for changes and recompiles the bundle:
```sh
npm run start:dev-server
```

### License
MIT [Tyler Reckart](https://github.com/tylerreckart)
