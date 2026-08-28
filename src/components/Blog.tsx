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
	increasedWidthMode?: boolean;
}

const Blog = ({ children, title = 'In this article', jsonLd, increasedWidthMode = false }: BlogProperties) => {
	return (
		<Suspense fallback={<BlogStatic jsonLd={jsonLd} increasedWidthMode={increasedWidthMode}>{children}</BlogStatic>}>
			<BlogDynamic title={title} jsonLd={jsonLd} increasedWidthMode={increasedWidthMode}>{children}</BlogDynamic>
		</Suspense>
	);
};

export default Blog;
