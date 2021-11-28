![An animated gif of Homer Simpson disappearing into the bushes](https://emojis.slackmojis.com/emojis/images/1450475643/211/homer-disappear.gif)
# [reckart.blog](https://reckart.blog)  
This repository serves as the foundation for my blog. It is comprised of a simple static site generator written in TypeScript and a [pug](https://pugjs.org/api/getting-started.html)-based templating system. It takes markdown content placed in the `posts` and `pages` directories, pipes them through the templating system and builds a complete, static website ready to be served by any web server. Images placed in the `photos/gallery` directory will be automatically injected into the site's photo gallery. Alt text and image width is configured in `photos/gallery/map.json`.

### Commands
Output the static HTML, JavaScript, and CSS bundles into the `build` directory:
```sh
npm run build
```
_or_
```sh
yarn build
```

Run an express hot-reload development server that watches for changes and recompiles the bundle:
```sh
npm run develop
```
_or_
```sh
yarn develop
```

### License
MIT [Tyler Reckart](https://github.com/tylerreckart)
