// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define a `loader` and `schema` for each collection
const docsCollection = defineCollection({
    loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        order: z.number(),
        xref: z.string(),
        title: z.string(),
        description: z.string(),
        ogImage: z.string().url().optional(),
        twitterImage: z.string().url().optional(),
        ruleType: z.string().optional(),
        showInSidebar: z.boolean().optional().default(true),
        hideChildPages: z.boolean().optional().default(false),
        highlight: z.object({
            ctaXref: z.string(),
            ctaAnchor: z.string().optional(),
            ctaText: z.string(),
            postedDateTime: z.date(),
            showOnHome: z.boolean().optional().default(true),
            showOnHighlights: z.boolean().optional().default(true),
            showInSidebar: z.boolean().optional().default(false)
        }).optional()
    })
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
    docs: docsCollection
};
