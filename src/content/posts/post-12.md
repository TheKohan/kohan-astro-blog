---
title: "The spectacle before us was indeed sublime"

description: "Welcome, it's great to have you here. We know that first impressions are important, so we've populated..."
author: "Piotr Kochanowski"
isMdx: true
publishDate: 2022-07-04
image:
  src: "test"
  alt: "The Astro logo with the word One."
tags: ["astro", "blogging", "learning in public"]
---

## My Awesome Blog Post

Welcome to my awesome blog post! In this post, I'll be sharing some tips and tricks for using Markdown to write blog posts.

## Headers

Headers are a great way to structure your blog post and make it easy to read. Here's an example of a header:

### Subheader

## Emphasis

You can emphasize text in Markdown using asterisks or underscores. Here are some examples:

- _Italic_
- **Bold**
- **_Bold and italic_**

## Lists

Lists are a great way to organize information. There are two types of lists in Markdown: ordered and unordered. Here's an example of an unordered list:

- Item 1
- Item 2
- Item 3

And here's an example of an ordered list:

1. Item 1
2. Item 2
3. Item 3

## Links

Links are a great way to reference other resources in your blog post. Here's an example:

[Google](https://www.google.com)

## Images

Images are a great way to add visual interest to your blog post. Here's an example:

![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/1200px-Markdown-mark.svg.png)

## Code

Code is a great way to share programming examples in your blog post. Here's an example of inline code:

`print("Hello, world!")` `create-t3-app`

And here's an example of a code block:

## Table

| **Name**    | **Age** | **Gender** |
| ----------- | ------- | ---------- |
| John Smith  | 25      | Male       |
| Jane Doe    | 30      | Female     |
| Bob Johnson | 40      | Male       |

```jsx
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Astro</title>
  </head>
  <body class="markdown">
    <a href="/">Home</a>
    <a href="/about/">About</a>
    <a href="/blog/">Blog</a>
    <a href="/posts/post-1">post-1</a>
    <a href="/posts/post-2">post-2</a>
    <a href="/posts/post-3">post-3</a>
    <h1>About Me</h1>
    <h2>... and my new Astro site!</h2>

    <p>
      I am working through Astro's introductory tutorial. This is the second
      page on my website, and it's the first one I built myself!
    </p>

    <p>
      This site will update as I complete more of the tutorial, so keep checking
      back and see how my journey is going!
    </p>
    <p>Here are a few facts about me:</p>
    <ul>
      <li>My name is {identity.firstName}.</li>
      <li>
        I live in {identity.country} and I work as a {identity.occupation}.
      </li>
      {identity.hobbies.length >= 2 && (
        <li>
          Two of my hobbies are: {identity.hobbies[0]} and {identity.hobbies[1]}
        </li>
      )}
    </ul>
    <p>My skills are:</p>
    <ul>
      {skills.map((skill) => (
        <li>{skill}</li>
      ))}
    </ul>
  </body>
</html>
```
