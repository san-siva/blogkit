'use client';

import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import type { Thing, WithContext } from 'schema-dts';
import BlogStatic from '../staticComponents/BlogStatic';

const BlogDynamic = lazy(() => import('../dynamicComponents/BlogDynamic'));

interface BlogProperties {
	children: ReactNode;
	title?: string;
	jsonLd?: WithContext<Thing>;
}

const Blog = ({ children, title = 'In this article', jsonLd }: BlogProperties) => {
	return (
		<Suspense fallback={<BlogStatic jsonLd={jsonLd}>{children}</BlogStatic>}>
			<BlogDynamic title={title} jsonLd={jsonLd}>{children}</BlogDynamic>
		</Suspense>
	);
};

export default Blog;
