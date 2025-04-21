import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { rssSchema } from '@astrojs/rss';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog };
