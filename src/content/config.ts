// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define your collection(s)
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
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  posts: postsCollection,
} as const;
