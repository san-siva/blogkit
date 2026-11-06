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

export const generateSectionHref = (id: string) => `#${id}`;

// the section in the URL: `#why`, or the older `?section=why` so links shared before the switch still work
export const getSectionFromUrl = (): string | null => {
	const url = new URL(window.location.href);
	const hash = decodeURIComponent(url.hash.slice(1));
	return hash || url.searchParams.get('section');
};

// writes the section as `#why` and drops any older `?section=` param, without scrolling or adding history
export const setSectionInUrl = (id: string) => {
	const url = new URL(window.location.href);
	url.searchParams.delete('section');
	url.hash = id;
	window.history.replaceState(window.history.state, '', url.toString());
};
