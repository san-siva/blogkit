import { isValidElement } from 'react';
import type { ReactNode } from 'react';

export const extractTextFromReactNode = (node: ReactNode): string => {
	if (node === null || node === undefined || typeof node === 'boolean') return '';
	if (typeof node === 'string' || typeof node === 'number') return String(node);
	if (isValidElement(node)) return extractTextFromReactNode((node.props as { children?: ReactNode }).children);
	if (Array.isArray(node)) return node.map(extractTextFromReactNode).join('');
	return '';
};

export const generateIdForBlogTitle = (title: string) => title.toLowerCase().replace(/[^\w\d]/g, '-');

export const generateUrlForBlogTitle = (title: string) => encodeURIComponent(title.replace(/[^\w]+/g, '-').toLowerCase());

export const generateSectionHref = (id: string) => `?section=${id}`;
