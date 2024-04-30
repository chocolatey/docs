// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const docsCollection = defineCollection({
    type: 'content',
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
