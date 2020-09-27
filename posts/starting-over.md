---
date: "October 1, 2020"
title: "Starting Over"
description: "In the decade since I've been building things for the web, first just noodling around as a teenager and then professionally, my personal website has gone through an innumerable amount of iteration. It was time for a fresh start."
---

In the decade since I've been building things for the web, first just noodling around as teenager and then professionally, my personal website has gone through an innumerable amount of iteration. I actually can't count the number of times I've rebuilt or redesigned my website because most of the early versions were long before I knew about `git` and version control.

Early versions were just static hand-written HTML and CSS bundles. Over the years my website would take the shape of a CMS-backed blog, a blog with hand-written post content in HTML templates (I definitely don't recommend that one), a single-page React application, and most recently a statically-rendered React blog. Each of those iterations had their ups and downs. One clear pattern that I could discern, though, was that with each new website the scale and complexity of what I was trying to accomplish would grow.

That was great in theory, but more to a limited extent in practice. With each version I built I would learn more about the tools I was using and could adapt the methods I experimented with on my personal website into my professional work. The last few versions of my website have been written in React. Don't get me wrong, I love React. I have been writing React apps and websites since 2015, but what I haven't always loved about React is the sheer amount of configuration and boilerplate code required to get an app up and running.

Now, things have gotten better over the years. There are great tools like [create-react-app](https://github.com/facebook/create-react-app), [Next.js](https://github.com/vercel/next.js), and [Gatsby](https://github.com/gatsbyjs/gatsby) (my [last website](https://github.com/tylerreckart/tylerreckart) was built with Gatsby) that make the tooling and configuration steps needed to get a React site up and running as minimal as possible. The issue, though, is that all of that configuration and boilerplate still exists behind the scenes. I just don't need an entire Babel and Webpack configuration and the immeasurable amount of dependencies that come with one just to publish content for the web.

It's all of those little things, while sleek and modern, that just added more friction to the publishing process than I wanted. I didn't want to have to worry about making sure my dependencies were up to date just in order to build the website. I shouldn't have to write an entire component hierarchy just to build a blog. It's because of this friction that I decided to completely start over with my website. I set out to build a publishing system that I _wanted_ to use. I didn't start with the goal to build a tool for other people, but what I ended up with is a static website generation tool that I'm calling [Mortar](https://github.com/tylerreckart/mortar).

I built Mortar to be exceptionally simple. I didn't want it to make any bold assumptions about what a user would want or burden them with complex configurations and deployment requirements. It doesn't try to outsmart the user. I wanted a website that got out of my way and allowed me to actually focus on the content, not making sure that the dependencies were up to date just in order to build the thing.

When I realized the extent to which the templating system could easily be extended and new themes could be written without having to change the build configuration, I knew open-sourcing it was what I wanted to do.

So, how does Mortar work? It's a straightforward adaptation of node's file system tools and a few libraries that take care of asset minification, XML generation, markdown parsing, and templating. Markdown files placed in the `pages` and `posts` directory are automatically parsed, fed through the templating system and compiled into HTML templates. All the web server has to do is serve content from the `build` folder. The exact method will vary based on the server configuration you're using (NGINX, Apache, etc), but the process is exceptionally simple.

The HTML markup for the pages is generated through [Pug](https://github.com/pugjs/pug) templates. Pug (formerly Jade) is a high-performance templating engine built especially for working with node apps. The syntax, heavily influenced by [Haml](https://haml.info/), is simple and only takes a few minutes to pick up.

```pug
include mixins/time.pug
doctype html
html(lang="en")
  head
    title=seoConfig.title
    meta(name="description", content=seoConfig.description)
    include template-parts/head.pug
  body
    main.content
      include template-parts/nav.pug
      include template-parts/intro.pug
      each post in posts
        article
          div.article--header
            a(href=post.path) #[h2=post.attributes.title]
            +time(post.attributes.date)
          div.article--content
            | !{post.body}
      include template-parts/footer.pug
```

That's the template for the homepage in Mortar's default theme. The theme this website uses to generate its markup. See what I mean about the markup being simple? Including reusable template components is just handled by an include directive and a path to the component. The variable scope is automatically passed to the included component, meaning that you don't have to worry about prop inheritance or explicitly passing what you need into the component.

More complex pieces of functionality are handled by pug mixins. The default theme currently only has one mixin for generating the `time` tags underneath the post titles.

```pug
-
  function toISODate(date) {
    return (new Date(Date.parse(date))).toISOString();
  }

mixin time(date)
  time(datetime!=toISODate(date), pubdate="pubdate")="Posted on " + date

```

One of the other reasons that pug templates are so powerful is because writing inline JavaScript is a breeze. In my post files in order to specify a date, all I have to do is write a plain calendar date and the mixin handles conversion to an ISO string and formatting for SEO.

Over the years I've used a lot of templating systems. Early in my career, [Twig](https://twig.symfony.com/) was the templating system I used to build websites for [Craft CMS](https://craftcms.com/). Since then I've also used [Handlebars](https://handlebarsjs.com/) templates and of course, JSX templates in a React-based static site renderer. Of all of those resources though, pug has to be the simplest I have used. The syntax is clean and easy to understand, making building themes for Mortar websites a breeze.

Mortar still has a long way to go before it's ready for a wider audience. The build system still can be optimized further and I have lofty ambitions for automatic deployments. Mortar started as a way for me to remove friction when it came to publishing posts on my website, allowing me to focus on what matters: the content. My hope is that if someone else out there has the same frustrations I have had when it comes to writing content for a personal website that Mortar can be an effective tool for them too.
