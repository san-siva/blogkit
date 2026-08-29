import { describe, expect, it } from 'vitest';
import { Suspense } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Blog from './Blog';
import BlogStatic from '../staticComponents/BlogStatic';

describe('Blog', () => {
	it('renders BlogStatic directly when isTocEnabled is false, skipping Suspense/BlogDynamic', () => {
		const element = Blog({ children: 'hello', isTocEnabled: false } as never);
		expect(element.type).toBe(BlogStatic);
		expect(element.props.children).toBe('hello');
	});

	it('wraps BlogDynamic in a Suspense boundary with a BlogStatic fallback when isTocEnabled is true (default)', () => {
		const element = Blog({ children: 'hello' } as never);
		expect(element.type).toBe(Suspense);
		expect(element.props.fallback.type).toBe(BlogStatic);
		expect(element.props.children.type.$$typeof).toBe(Symbol.for('react.lazy'));
	});

	it('renders children through the static path', () => {
		const html = renderToStaticMarkup(<Blog isTocEnabled={false}>content</Blog>);
		expect(html).toContain('content');
	});

	it('passes increasedWidthMode through to BlogStatic when isTocEnabled is false', () => {
		const withIncreasedWidth = Blog({ children: 'hi', isTocEnabled: false, increasedWidthMode: true } as never);
		expect(withIncreasedWidth.props.increasedWidthMode).toBe(true);

		const withoutIncreasedWidth = Blog({ children: 'hi', isTocEnabled: false } as never);
		expect(withoutIncreasedWidth.props.increasedWidthMode).toBe(false);
	});

	it('passes jsonLd through to BlogStatic when isTocEnabled is false', () => {
		const jsonLd = { '@context': 'https://schema.org', '@type': 'Thing' } as never;
		const element = Blog({ children: 'hi', isTocEnabled: false, jsonLd } as never);
		expect(element.props.jsonLd).toBe(jsonLd);
	});
});
