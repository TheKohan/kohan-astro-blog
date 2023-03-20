---
title: My Second Blog Post
author: Astro Learner
description: "After learning some Astro, I couldn't stop!"
isMdx: true
publishDate: 2022-07-02
image:
  src: "https://img.freepik.com/free-photo/blogging-gone-viral-camera-concept_53876-127618.jpg?w=2000&t=st=1679335075~exp=1679335675~hmac=8179dee088b8dfd3ac8a0823d994a95185191681d85fe189736681d56f3df1b2"
  alt: "The Astro logo with the word One."
layout: "../../layouts/Blog.astro"
tags: ["astro", "blogging", "learning in public", "successes"]
---

## Building a Todo List Application with React

In this tutorial, we will be building a simple todo list application using React. We will start with a basic HTML template and then add React to it to create a dynamic application.

### Prerequisites

Before we get started, you will need to have the following installed:

- Node.js
- npm

### Setting Up the Project

First, let's create a new project folder and initialize a new Node.js project:

```t
mkdir todo-list-app
cd todo-list-app
npm init -y
```

Next, let's install the necessary dependencies:

```t
npm install react react-dom
npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/preset-react
```

We will be using webpack and Babel to compile our code and React to create our application.

### Creating the HTML Template

Let's create a basic HTML template for our application. Create a new file called `index.html` and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Todo List App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

This will create a basic HTML file that includes a `div` with an `id` of `root` where we will render our React application, and a `script` tag that includes our compiled JavaScript file.

### Creating the React Components

Next, let's create our React components. Create a new file called `App.jsx` and add the following code:

```ts
import React from 'react';

class App extends React.Component {
constructor(props) {
super(props);

    this.state = {
      todos: [],
      newTodo: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

}

handleInputChange(event) {
this.setState({ newTodo: event.target.value });
}
```
