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

Lets then create our project in `./pretty-code-blocks` directory with a `empty` preset and of course `Typescript` support too.

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
        padding: 3rem;
    }
</style>
```

Now as we don't really need our generic landing page let's delete `pages/index.astro` and replace it with `index.md`. Astro will automatically pick up files in this directory and embedd markup files in specified layouts. If you want to avoid putting your content inside `pages` directory (you want to dynamically render routes) check out [Astro's content collections](https://docs.astro.build/pl/guides/content-collections/) 

```astro title="index.md"
---
layout: "../layouts/layout.astro" // route to our layout
---

## Basic layout setup
<!-- remove "/" before backticks to make it work in .md -->
/```js title="somethingComponent.ts" {4-6}
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
const CodeBlock = ({ codestring }) => {
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
            {codeString}
    </SyntaxHighlighter>
  );
};
/```
```

And thats it ! Our basic configuration is done. Now lets run the app from terminal with `npm run dev`.

![Photo of code block](https://res.cloudinary.com/kohan-devblog/image/upload/c_scale,w_1188/v1681935130/Posts/markdown-reader-astro-rehype-pretty-code/Screenshot_2023-04-19_at_22.11.48_pak9lg.png)

Thanks to Astro's built in `Shiki`, `Rehype` and `Remark` we're seeing styled and formatted code block. But that's just the beggining as we want it to look "pretty".

## Instaling `rehype-pretty-code`

 `rehype-pretty-code` is a Rehype plugin that provides styling and functionality for code blocks parsing. 
 Lets install it with npm:
```bash
npm install rehype-pretty-code
```
Next lets set up our plugin inside `astro.config.mjs`. It will be a basic configuration with line highlighting and
hooking up downloaded theme from `.json` file. Bear in mind that config can be further extended, to see all of the possibilities visit [rehype-pretty-code GitHub](https://rehype-pretty-code.netlify.app/).


```js title="astro.config.mjs" showLineNumbers {2-3,6-27,30-35}
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
  onVisitHighlightedWord(node) {
    // Adding a class to the highlighted word
    node.properties.className = ['word'];
  },
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
        padding: 3rem;
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

![Photo of code block after applying plugin](https://res.cloudinary.com/kohan-devblog/image/upload/v1682185019/Posts/markdown-reader-astro-rehype-pretty-code/Screenshot_2023-04-22_at_18.56.46_yfrgpd.png)



