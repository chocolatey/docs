import type { ContentTree } from '@scripts/types';

export const isActivePage = (passedSlug: string | ContentTree[], activeSlug: string) => {
    return passedSlug === activeSlug || `${passedSlug}/` === activeSlug || passedSlug.slice(0, -1) === activeSlug;
};
