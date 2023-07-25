import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content', // v2.5.0 and later
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