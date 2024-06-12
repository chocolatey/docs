// Scripts and types
import { z } from 'zod';
import type { ContentTree } from '@scripts/types';
import { generateContentTree } from '@scripts/generate-content-tree';

export const xrefLinkValueSchema = z.string();
export const xrefLinkAnchorSchema = z.string().optional();

export type XrefLinkValue = z.infer<typeof xrefLinkValueSchema>;
export type XrefLinkAnchor = z.infer<typeof xrefLinkAnchorSchema>;

export const constructFlatMap = async (): Promise<{ [key: string]: string }[]> => {
    const contentTree = await generateContentTree();
    const flatMap: { [key: string]: string }[] = [];

    const traverseTree = (node: ContentTree) => {
        flatMap.push({ [node.data.xref]: node.slug });
        node.children.forEach(traverseTree);
    };

    contentTree.forEach(traverseTree);

    return flatMap;
};

export const xref = async (value: XrefLinkValue, anchor: XrefLinkAnchor): Promise<string> => {
    // Validate the content
    xrefLinkValueSchema.parse(value);
    xrefLinkAnchorSchema.parse(anchor);

    const xrefs = await constructFlatMap();

    const result = xrefs.find(item => value in item);

    if (!result) {
        throw new Error(`No xref found for ${value}`);
    }

    const link = anchor ? `${result[value]}#${anchor}` : `${result[value]}`;

    return link;
};
