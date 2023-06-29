---
title: "Build your own styled code blocks with Astro and Rehype Pretty Code"
description: "Build great looking codeblocks with highlighting, titles and line numbering."
author: "Piotr Kochanowski"
isMdx: true
publishDate: 2023-04-18
image:
  src: "test"
  alt: "The Astro logo with the word One."
tags: ["astro", "blogging", "learning in public"]
---

With astro it has never been easier to build efficient, fast and content-rich sites. It has built-in markdown reader with file-based routing system, all we need to do is to handle the styling and layout side of things. Though it provides much utility out of the box, the customization can be rather tricky.

Today we're going to build a complex great looking code blocks with highlighting, line numbering and titles.

## Initialize Astro project

First let's initialize astro project

```bash 
# create a new project with npm or yarn or pnpm
npm create astro@latest
```

Then let's create our project in `./pretty-code-blocks` directory with an `empty` preset and of course `Typescript` support.

## Basic setup

First lets create layout for our markdown file. It will be a simple `.astro` component with some initial styling.

```text {10-11}
├── README.md
├── astro.config.mjs
├── package-lock.json
├── package.json
├── public
│   ├── favicon 2.svg
│   └── favicon.svg
├── src
│   ├── env.d.ts
│   ├── layouts
│   │   └── layout.astro
│   └── pages
│       └── index.astro
└── tsconfig.json
```

Now lets write some astro! This will be a simple html page with `</slot>` in which markup will be rendered.

```astro title="layout.astro" showLineNumbers
---
// There's no need for props in our case,
// but we could access frontmatter here if we wanted to further customize our layout
// Check: https://docs.astro.build/pl/guides/markdown-content/#frontmatter-layout
---

<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="viewport" content="width=device-width" />
		<meta name="generator" content={Astro.generator} />
		<title>Astro</title>
	</head>
	<body>
        <div class="content">
           <slot/> <!--  This is where our parsed markdown would be rendered -->
        </div>
	</body>
</html>

<style is:global>
    /* Some initial Styles */
    body { 
        width: 100vw;
        height: 100vh;
        background-color: #1c78a6;
        color:white;
    }
    .content {
        max-width: 800px;
        margin: 0 auto;
        font-size: 16px;
        padding: 8rem 0;
    }
</style>
```

Now as we don't really need our generic landing page let's delete `pages/index.astro` and replace it with `index.md`. Astro will automatically pick up files in this directory and embedd markup files in specified layouts. If you want to avoid putting your content inside `pages` directory (you want to dynamically render routes) check out [Astro's content collections](https://docs.astro.build/pl/guides/content-collections/) 

````md title="index.md"
---
layout: "../layouts/layout.astro" // route to our layout
---

```js title="somethingComponent.ts"
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
const CodeBlock = ({ codestring }) => {
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
            {codeString}
    </SyntaxHighlighter>
  );
};
```
````

And thats it ! Our basic configuration is done. Now lets run the app from terminal with `npm run dev`.

![Photo of code block](https://res.cloudinary.com/kohan-devblog/image/upload/c_scale,w_1114/v1688062307/Posts/markdown-reader-astro-rehype-pretty-code/Screenshot_2023-06-29_at_20.09.29_lelqld.png)

Thanks to Astro's built in `Shiki`, `Rehype` and `Remark` we're seeing styled and formatted code block. But that's just the beggining as we want it to look "pretty".

## Instaling `rehype-pretty-code`

 `rehype-pretty-code` is a Rehype plugin that provides styling and functionality for code blocks parsing. 
 Lets install it with npm:
```bash
npm install rehype-pretty-code
```
Next lets set up our plugin inside `astro.config.mjs`. It will be a basic configuration with line highlighting and
hooking up downloaded theme from `.json` file. Bear in mind that config can be further extended, to see all of the possibilities visit [rehype-pretty-code GitHub](https://rehype-pretty-code.netlify.app/).


```js title="astro.config.mjs" showLineNumbers {2-3,6-11,14-19}
import { defineConfig } from 'astro/config';
import rehypePrettyCode from "rehype-pretty-code";
import json from "./public/moon_ii.json" assert { type: "json" };

 
const options = {
  // Specify the theme to use or a custom theme json, in our case
  // it will be a moonlight-II theme from
  // https://github.com/atomiks/moonlight-vscode-theme/blob/master/src/moonlight-ii.json
  theme: json,
};
// https://astro.build/config
export default defineConfig({
    markdown:{
        syntaxHighlight: false, // Disable syntax built-in syntax hightlighting from astro
        rehypePlugins: [
            [rehypePrettyCode, options],
        ],      
    },
});
```
Lets modify the styles a bit to see how much our code block has already changed.
```astro title="layout.astro" showLineNumbers {14-19}
<style is:global>
    body { 
        width: 100vw;
        height: 100vh;
        background-color: #1c78a6;
        color:white;
    }
    .content {
        max-width: 800px;
        font-size: 16px;
        margin: 0 auto;
        padding: 8rem 0;
    }
    .content pre > code {
        display: grid; /*  this is way the line will span whole width of `code` component */
        padding: 1.5rem 0;
        background-color: #1E293B;
        border-radius: 0.5rem;
    }
</style>
```

This way we end up with this code snippet. We'll now move to adding some functionality to it.

![Photo of code block after applying plugin](https://res.cloudinary.com/kohan-devblog/image/upload/c_scale,w_1077/v1688062536/Posts/markdown-reader-astro-rehype-pretty-code/Screenshot_2023-06-29_at_20.15.13_tme3ng.png)

## Code highlighting

Markdown is starting to look a bit better, lets now add code highlighting feature which is provided by `rehype-pretty-code`. 

```js title="astro.config.mjs" showLineNumbers {11-23}
import { defineConfig } from 'astro/config';
import rehypePrettyCode from "rehype-pretty-code";
import json from "./public/moon_ii.json" assert { type: "json" };

 
const options = {
  // Specify the theme to use or a custom theme json, in our case
  // it will be a moonlight-II theme from
  // https://github.com/atomiks/moonlight-vscode-theme/blob/master/src/moonlight-ii.json
  theme: json,
  // Callbacks to customize the output of the nodes
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{type: 'text', value: ' '}];
    }
  },
  onVisitHighlightedLine(node) {
    // Adding a class to the highlighted line
    node.properties.className.push('highlighted');
  },
};
// https://astro.build/config
export default defineConfig({
    markdown:{
        syntaxHighlight: false,
        rehypePlugins: [
            [rehypePrettyCode, options],
        ],      
    },
});

```

After making this changes will be able to use meta string `{<linestart>-<lineend>,<line>}` to highlight any line of range of lines. Now we'll want to style the lines with `highlighted` class on it.

```astro title="layout.astro" {20-27} showLineNumbers
<style is:global>
    body { 
        width: 100vw;
        height: 100vh;
        background-color: #1c78a6;
        color:white;
    }
    .content {
        max-width: 800px;
        font-size: 16px;
        margin: 0 auto;
        padding: 8rem 0;
    }
    .content pre > code {
        display: grid; /*  this is way the line will span whole width of `code` component */
        padding: 1.5rem 0;
        background-color: #1E293B;
        border-radius: 0.5rem;
    }
    .content pre > code .line {
        border-left: 0.5rem solid transparent;
        padding: 0 0.5rem;
    }
    .content pre > code .highlighted {
        background-color: #2e4c35;
        border-color: #469458;
    }
</style>
```
Now lets highlight some lines in our `index.md` 

````md title="index.md" {5}
---
layout: "../layouts/layout.astro" // route to our layout
---

```js title="somethingComponent.ts" {1-2, 5-8}
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
const CodeBlock = ({ codestring }) => {
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
            {codeString}
    </SyntaxHighlighter>
  );
};
```
````

So we'll end up with something like this:

![Markdown with highlights](https://res.cloudinary.com/kohan-devblog/image/upload/c_scale,w_1111/v1688066736/Posts/markdown-reader-astro-rehype-pretty-code/Screenshot_2023-06-29_at_21.25.21_pxv8dy.png)

## Line numbering

Now we're going to implment line countering using `counter` css prop, i'm pretty sure many of you hear about it for the first time here. Don't worry there are a lot of css properties that are not being used on the daily basis by most of the devs.

Lets implement counter which will count our `span` elements with `.line` class.

```astro title="layout.astro" {28-61} showLineNumbers
<style is:global>
    body { 
        width: 100vw;
        height: 100vh;
        background-color: #1c78a6;
        color:white;
    }
    .content {
        max-width: 800px;
        font-size: 16px;
        margin: 0 auto;
        padding: 8rem 0;
    }
    .content pre > code {
        display: grid; /*  this is way the line will span whole width of `code` component */
        padding: 1.5rem 0;
        background-color: #1E293B;
        border-radius: 0.5rem;
    }
    .content pre > code .line {
        border-left: 0.5rem solid transparent;
        padding: 0 0.5rem;
    }
    .content pre > code .highlighted {
        background-color: #2e4c35;
        border-color: #469458;
    }
    /** 
     *  data-line-numbers will be enabled on markdown  
     *  with `showLineNumbers` meta string on it
     */
    .content pre > code[data-line-numbers] {
        counter-reset: line;
    }
    .content pre > code[data-line-numbers] > .line::before {
        counter-increment: line;
        content: counter(line);
        display: inline-block;
        margin-right: 2rem
        width: 1rem;
        text-align: left;
        color: #7ca2dfad;
    }
    .content pre > code > .line::before {
        content: "";
        display: inline-block;
        width: 1rem;
        text-align: right;
    }

    /** 
     *  we'll need to adjust the space required 
     *  the number depending on the number of digits 
     */
    .content pre > code[data-line-numbers-max-digits="2"] > .line::before {
        width: 2rem;
    }

    .content code[data-line-numbers-max-digits="3"] > .line::before {
        width: 3rem;
    }
</style>
```

Lets now enable line numbering for our markdown

````md title="index.md" {5}
---
layout: "../layouts/layout.astro" // route to our layout
---

```js title="somethingComponent.ts" {1-2, 5-8} showLineNumbers
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
const CodeBlock = ({ codestring }) => {
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
            {codeString}
    </SyntaxHighlighter>
  );
};
```
````

Right now all the lines of could should be numbered

![Markdown with highlighting and line numbering](https://res.cloudinary.com/kohan-devblog/image/upload/c_scale,w_1153/v1688068184/Posts/markdown-reader-astro-rehype-pretty-code/Screenshot_2023-06-29_at_21.49.26_uelj2f.png)

All that is left to do is do something about that ugly title on top of the markdown. Lets handle that next!

## Styling markdown's title

Styling the title is fairly simple as `rehype-pretty-code` has us covered here, we'll just need to target custom attribute that the plugin attaches to the element with our css.

```astro title="layout.astro" {63-76} showLineNumbers
<style is:global>
    body { 
        width: 100vw;
        height: 100vh;
        background-color: #1c78a6;
        color:white;
    }
    .content {
        max-width: 800px;
        font-size: 16px;
        margin: 0 auto;
        padding: 8rem 0;
    }
    .content pre > code {
        display: grid; /*  this is way the line will span whole width of `code` component */
        padding: 1.5rem 0;
        background-color: #1E293B;
        border-radius: 0.5rem;
    }
    .content pre > code .line {
        border-left: 0.5rem solid transparent;
        padding: 0 0.5rem;
    }
    .content pre > code .highlighted {
        background-color: #2e4c35;
        border-color: #469458;
    }
    /** 
     *  data-line-numbers will be enabled on markdown  
     *  with `showLineNumbers` meta string on it
     */
    .content pre > code[data-line-numbers] {
        counter-reset: line;
    }
    .content pre > code[data-line-numbers] > .line::before {
        counter-increment: line;
        content: counter(line);
        display: inline-block;
        margin-right: 2rem
        width: 1rem;
        text-align: left;
        color: #7ca2dfad;
    }
    .content pre > code > .line::before {
        content: "";
        display: inline-block;
        width: 1rem;
        text-align: right;
    }

    /** 
     *  we'll need to adjust the space required 
     *  the number depending on the number of digits 
     */
    .content pre > code[data-line-numbers-max-digits="2"] > .line::before {
        width: 2rem;
    }

    .content code[data-line-numbers-max-digits="3"] > .line::before {
        width: 3rem;
    }

    .content [data-rehype-pretty-code-fragment]{
        position: relative;
    }
    .content [data-rehype-pretty-code-title] {
        position: absolute;
        top:-1.75rem;
        left:0;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        background-color: #1E293B;
        color:#9abcf3ec;
        padding: 0.5rem 1rem;
    }
</style>
```

## Final words
![Markdown](https://res.cloudinary.com/kohan-devblog/image/upload/c_scale,w_1009/v1688069259/Posts/markdown-reader-astro-rehype-pretty-code/Screenshot_2023-06-29_at_22.07.24_ycz4aa.png)

Good looking markdown is a crucial element when building your own tech blog and `rehype-pretty-code` makes it super simple to implement feature rich codeblocks.

Remember that there are far more features than the ones i've shown in this blogpost. You can try out other ones for yourself [visiting rehype-pretty-code website](https://rehype-pretty-code.netlify.app/)

