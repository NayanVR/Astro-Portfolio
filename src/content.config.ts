import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    author: z.enum(["Nayan"]),
    category: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    title: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};
