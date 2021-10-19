---
date: "October 1, 2020"
title: "Starting Over"
description: "In the decade that I've been building things for the web; first just noodling around as a teenager picking up freelance projects here and there, then professionally, my personal website has gone through an immeasurable amount of iteration. It was time for a fresh start."
---

In the decade that I've been building things for the web; first just noodling around as a teenager picking up freelance projects here and there, then professionally, my personal website has gone through an immeasurable amount of iteration. I actually can't count the number of times I've rebuilt or redesigned my website because most of the early iterations came and went long before I knew anything about version control.

Early iterations were simple static HTML and CSS bundles with a tinge of JavaScript thrown in for effect. Over the years my website would evolve to take the form of a CMS-backed blog, a blog with hand-written post content as HTML templates (I definitely don't recommend that one), a single-page React application, and most recently a [statically-rendered React blog](https://github.com/tylerreckart/tylerreckart.com).

Looking back, I can see each iteration as a reflection of where I was in my journey as a software developer. As my skillset increased and depth of knowledge expanded, my goals for what my website could be grew in turn. The last few iterations of my website have been built in React; and why shouldn't they have been? I've been working with React professionally since 2015. I love React and the flexibility it gives developers to build and ship modern apps for the web. However, what I haven't always loved about React is the sheer amount of boilerplate code required to get an app up and running.

I should note that things have gotten better over the years. There are great tools like [create-react-app](https://github.com/facebook/create-react-app), [Next.js](https://github.com/vercel/next.js), and [Gatsby](https://github.com/gatsbyjs/gatsby) that make the tooling and configuration steps needed to get a React app up and running as minimal as possible. This is nice, but they don't get rid of the problem. The configuration and boilerplate still exists behind the scenes in the respective package's build system.

When I decided to rethink my website for this iteration, I had to think long and hard about that reality. I decided that I just didn't need an entire Babel and Webpack configuration and the immeasurable amount of dependencies that come with one just to publish content for the web. It's all of those little idiosyncrasies specific to React development that just added more friction to the publishing process than I wanted. I didn't want to have to worry about making sure my dependencies were up to date just to build the website. I shouldn't have to write an entire component hierarchy just to build a blog. 

It was that friction that kept me from publishing more on the blogs I've built in the past. So, I set out to build a publishing system that I actually _wanted_ to use. I ended up with three requirements:
1. The website should be statically rendered.
2. The website should have as few dependencies as possible.
3. All post and page content should be rendered with Markdown templates.

Those requirements, and a week of playing around with Node's file system tools have led me to this iteration. All of the content on the website is written in Markdown with the HTML markup being generated through [Pug](https://github.com/pugjs/pug) templates. The only dependencies the build system has are related to asset minification, code-block formatting, templating, and XML generation for the RSS feed. That's it. No complex build configurations.

During the build process for this website, I had a realization about how extensible the templating system is and how easy it would be to write additional themes that could be quickly configured with a single point of configuration. I didn't set out to build a tool that other people could use to build static websites quickly and easily, but what I ended up with is what I am calling [Mortar](https://github.com/tylerreckart/mortar).

Mortar is built to be exceptionally simple. I didn't want it to make any bold assumptions about what a user would want or to burden them with complex configurations and deployment requirements. Simply put, it doesn't try to outsmart the user. Mortar gets out of the way and allows the user to focus on what actually matters: the content.

So, how does it work. As mentioned briefly above, it's a straightforward adaptation of Node's file system tools and a few additional libraries that aid with asset minification, markdown parsing, and templating. Markdown files placed in the pages and posts directories are automatically parsed, fed through the templating system and compiled into HTML templates. All the web server has to do is serve content from the `build` folder. The exact method for accomplishing that will vary based on the server a configuration a user might be utilizing (NGINX, Apache, etc), but the process is exceptionally simple.

I chose Pug as the templating engine for the HTML markup because of its performance and specific bend towards Node apps. The syntax, heavily influenced by [Haml](https://haml.info/), is simple and only takes a few minutes to pick up. Inline JavaScript is a breeze and variable scope is automatically passed into included components, meaning that you don't have to worry about prop inheritance or explicitly passing what you need into the component.

```pug
include mixins/time.pug
doctype html
html(lang="en")
  head
    if seo.title
      title=seo.title
    else
      title=""
    if seo.description
      meta(name="description", content=seo.description)
    else
      meta(name="description", content="")
    include templates/head.pug
  body
    main.content
      include templates/nav.pug
      include templates/intro.pug
      each post in posts
        article
          div.article--header
            a(href=post.path) #[h2=post.attributes.title]
            +time(post.attributes.date)
          div.article--content
            | !{post.body}
      include templates/footer.pug
```

That's the pug template that generates all of the markup for the homepage of this website. That's it. More complex pieces of functionality, such as generating the time tags underneath post titles is easily handled by Pug mixins that can be included in a number of templates.

```pug
-
  function toISODate(date) {
    return (new Date(Date.parse(date))).toISOString();
  }

mixin time(date)
  time(datetime!=toISODate(date), pubdate="pubdate")="Posted on " + date
```

Over the years I've used a lot of different templating engines. Early in my career, Twig was the templating system I used to build Craft CMS websites. In the intervening time I've used Handlebars templates, EJS templates, and of course, JSX templates in the context of React apps. Of all of those varying templating engines, Pug has to be the simplest I have used. The syntax is clean, declarative, and easy to understand. It makes building themes for Mortar websites a breeze.

Mortar still has a long way to go as a tool before it's ready for a wider audience. It's still firmly in it's "happy accident" phase. It has several aspects that can be optimized further and I have lofty ambitions for automatic deployments. Mortar started as a way for me to remove friction from the process of publishing content on my website. My hope is that if someone else out there has the same frustrations I've had when it comes to writing content for a personal website without the weight that comes from a full-fledged CMS, that Mortar can be an effective tool for them too.

I'm extremely pleased with this iteration of my website. I'm excited to use this clean slate and the build system I've put together as a springboard to publish more content to my home on the web.
