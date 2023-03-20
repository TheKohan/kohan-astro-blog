import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    isMdx: z.boolean(),
    tags: z.array(z.string()),
    author: z.string(),
    publishDate: z.date(),
  }),
});

export const collections = {
  posts: postsCollection,
} as const;
