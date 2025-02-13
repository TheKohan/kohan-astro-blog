import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import path from "path";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import image from "@astrojs/image";
import { remarkReadingTime } from "./src/plugins/remark-read-time-plugin.mjs";
import rehypePrettyCode from "rehype-pretty-code";
import json from "./public/assets/moon_ii.json" assert { type: "json" };

const prettyCodeOptions = {
  theme: json,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: "text",
          value: " ",
        },
      ];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
  tokensMap: {},
};

// https://astro.build/config
export default defineConfig({
  site: `https://kohan.dev/`,
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [rehypePrettyCode, prettyCodeOptions],
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noreferrer noopener"],
          content: {
            type: "text",
            value: "↗",
          },
        },
      ],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            class: "heading-link heading-link--hidden---effects",
            "data-heading-link": true,
          },
          behavior: "wrap",
        },
      ],
    ],
    // shikiConfig: {
    //   theme: "one-dark-pro",
    //   wrap: true,
    // },
  },
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkReadingTime],
    }),
    sitemap(),
    tailwind(),
    image(),
  ],
  vite: {
    resolve: {
      alias: {
        "@layouts": path.resolve("./src/layouts"),
        "@components": path.resolve("./src/components"),
        "@styles": path.resolve("./src/styles"),
        "@models": path.resolve("./src/models"),
      },
    },
  },
});
