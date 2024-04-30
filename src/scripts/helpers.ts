export const slugId = (slug: string) => {
    return slug.replace(/\//g, '-');
};
