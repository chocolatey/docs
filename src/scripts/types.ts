import { z } from 'zod';

// ContentTree
// ContentTree - Define the base schema without the recursive property
const contentTreeBaseSchema = z.object({
    id: z.string(),
    slug: z.string(),
    body: z.string(),
    collection: z.string(),
    data: z.object({
        order: z.number(),
        xref: z.string(),
        title: z.string(),
        description: z.string(),
        showInSidebar: z.boolean(),
        hideChildPages: z.boolean(),
        depth: z.number()
    })
});

// ContentTree - Define the base ContentTree type
export type ContentTreeBase = z.infer<typeof contentTreeBaseSchema>;

// ContentTree - Define the recursive ContentTree type
export type ContentTree = z.infer<typeof contentTreeBaseSchema> & {
    children: ContentTree[];
};
export const contentTreeSchema: z.ZodType<ContentTree> = contentTreeBaseSchema.extend({
    children: z.lazy(() => contentTreeSchema.array())
});

// ContentToc
// ContentToc - Define the base schema without the recursive property
const contentTocBaseSchema = z.object({
    depth: z.number(),
    slug: z.string(),
    text: z.string()
});

// ContentToc - Define the base ContentToc type
export type ContentTocBase = z.infer<typeof contentTocBaseSchema>;

// ContentToc - Define the recursive ContentToc type
export type ContentToc = z.infer<typeof contentTocBaseSchema> & {
    subheadings: ContentToc[];
};
