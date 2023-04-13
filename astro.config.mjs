import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";
import rehypeExternalLinks from "rehype-external-links";
import remarkCodeTitles from "remark-code-titles";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import image from "@astrojs/image";
import { remarkReadingTime } from "./src/plugins/remark-read-time-plugin.mjs";

// https://astro.build/config
export default defineConfig({
  site: `https://kohan.dev/`,
  markdown: {
    remarkPlugins: [remarkCodeTitles, remarkReadingTime],
    rehypePlugins: [
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
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  integrations: [
    react(),
    mdx({ remarkPlugins: [remarkCodeTitles, remarkReadingTime] }),
    sitemap(),
    tailwind(),
    image(),
  ],
});
