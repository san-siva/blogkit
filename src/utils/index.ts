export const generateIdForBlogTitle = (title: string) => title.toLowerCase().replace(/[^\w\d]/g, '-');

export const generateUrlForBlogTitle = (title: string) => encodeURIComponent(title.replace(/[^\w]+/g, '-').toLowerCase());
