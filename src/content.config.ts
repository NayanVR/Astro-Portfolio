import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        description: z.string(),
        author: z.enum(["NayanVR"]),
        tags: z.array(z.enum(["astro", "blogging", "learning in public"]))
    }),
});

export const collections = {
    'blog': blogCollection,
};
