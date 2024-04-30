// Scripts and types
import type { ContentToc, ContentTocBase } from '@scripts/types';

export const generateContentToc = async (headings: ContentTocBase[]): Promise<ContentToc[]> => {
    const toc: ContentToc[] = [];
    const parentHeadings = new Map();

    headings.forEach(item => {
        const heading = { ...item, subheadings: [] };

        parentHeadings.set(heading.depth, heading);

        if (heading.depth === 2) {
            toc.push(heading);
        } else {
            // Check if the parent heading exists before pushing
            const parentHeading = parentHeadings.get(heading.depth - 1);

            if (parentHeading) {
                parentHeading.subheadings.push(heading);
            }
        }
    });

    return toc;
};
