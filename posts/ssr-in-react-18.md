---
date: "June 8, 2021"
title: "Server-side rendering in React 18"
description: "Among the many improvements in React 18, one of the standouts in my opinion are the updates to server-side rendering (SSR) performance. For those that don't know, SSR lets your app generate HTML from React components directly on the server, which then gets served to your users. This allows your users to see the page's content before your app's JavaScript bundle is loaded and run. Most of the improvements are behind in the scenes, but bundled in are a few opt-in methods that are worth exploring."
published: true
---

Among the many improvements in React 18, one of the standouts in my opinion are the updates to server-side rendering (SSR) performance. For those that don't know, SSR lets your app generate HTML from React components directly on the server, which then gets served to your users. This allows your users to see the page's content before your app's JavaScript bundle is loaded and run. Most of the improvements are behind in the scenes, but bundled in are a few opt-in methods that are worth exploring.

At the outset, we should establish how SSR works in React:

1. A request is sent from the client.
2. The server fetches the data for the entire app.
3. The server renders the entire app as HTML and sends it in the response.
4. The client loads the JavaScript bundle for the app.
5. The client runs the code in the JavaScript bundle, connecting it to the generated HTML.

This approach works, and it has for a long time, but it's not an optimal solution.

The first problem is that your app has to fetch _everything_ from the server before your app can show anything. By the time the DOM is painted with the server-generated HTML, you must already have all the data ready for your components on the server. The second issue, building on the first, is that your app has to load _everything_ before it can hydrate the server-generated HTML with the JavaScript code. Prior to React 18, React programmatically stepped through the server-generated HTML while rendering the components, attaching every listeners, and executing functions. The performance hit comes from the fact that due to this method of execution, **your app must load the JavaScript for _every_ component in the render tree before it can start hydrating _any_ of them**. The final consequence from this design methodology is that your app must hydrate everything before the end-user can interact with anything.

With prior versions of React, rendering is all or nothing. Your server responds with HTML, which is received by the client and is then hydrated when the bundle is loaded.

```html
<html>
  <head>
    <title>My webpage</title>
  </head>
  <body>
    <main>
      <header>
        <span>My webpage</span>
        <nav>
          <a href="/about">About</a>
        </nav>
      </header>
      <article>
        <h1>Post title</h1>
        <p>...</p>
      </article>
      <section class="comments">...</section>
    </main>
  </body>
</html>
```

In React 18, you can now wrap part of a component tree with the [`<Suspense>`](https://github.com/reactwg/react-18/discussions/37) component.

```jsx
<Flex>
  <Header />
  {posts.map((post) => (
	<Flex.Item>
		<Post
		  title={post.title}
		  body={post.body}
		/>
		<Suspense fallback={<Loading />}>
		  <Comments comments={post.comments} />
		</Suspense>
	</Flex.Item>
  )}
</Flex>
```

By wrapping the `<Comments>` component with `<Suspense>`, React won't wait for the comments to start streaming to render the HTML for the rest of the page. Instead, React will render a placeholder (fallback) component until the comments are loaded.

The HTML sent by the server will now look something like this:

```html
<html>
  <head>
    <title>My webpage</title>
  </head>
  <body>
    <main>
      <header>
        <span>My webpage</span>
        <nav>
          <a href="/about">About</a>
        </nav>
      </header>
      <article>
        <h1>Post title</h1>
        <p>...</p>
      </article>
      <section class="loading">
        <span>Loading...</span>
      </section>
    </main>
  </body>
</html>
```

Then, when the data for the comments is ready on the server React will automatically inject the new HTML into the stream as well as a `<script>` tag that includes logic to replace the component in the HTML stream. That's where the power of the `<Suspense>` component lives. Your app doesn't have to fetch _all_ of the data before your server can render anything. If some part of the call stack delays the initial response, you don't have to choose between delaying all of the HTML in the response or substituting it until the data is ready.

The features introduced by `<Suspense>` solve all three of the existing problems with SSR in React:

1. Your app no longer needs to wait for all of the data to load on the server before rendering HTML.
2. Your app no longer needs to wait for all JavaScript to load to start hydrating.
3. Your app no longer needs to wait for all the components in the current render tree to be hydrated for users to start interacting with the page. Instead, the `<Suspense>` component along with [ `createRoot` ](https://github.com/reactwg/react-18/discussions/5) uses selective hydration to prioritize the components the user is interacting with and hydrate them early.

The `<Suspense>` component is completely opt-in. Simply replace your `if (isLoading) { ... }` conditionals with `<Suspense>` wrappers. The improvements are automatic, but it serves as an illustrative example of the power of declarative component loading states. Your users will see your app's content sooner and will be able to start interacting with it faster. The slowest parts of your app will no longer hold back the parts that are fast. If your app uses SSR to serve content, the `<Suspense>` component in React 18 is a no-brainer.
