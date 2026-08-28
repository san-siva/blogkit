'use client';

import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import type { Thing, WithContext } from 'schema-dts';
import { useWidthMode } from '../context/WidthModeContext';
import BlogStatic from '../staticComponents/BlogStatic';

const BlogDynamic = lazy(() => import('../dynamicComponents/BlogDynamic'));

interface BlogProperties {
	children: ReactNode;
	title?: string;
	jsonLd?: WithContext<Thing>;
	increasedWidthMode?: boolean;
}

const Blog = ({ children, title = 'In this article', jsonLd, increasedWidthMode }: BlogProperties) => {
	const widthMode = useWidthMode();
	const resolvedIncreasedWidthMode =
		increasedWidthMode ?? widthMode?.increasedWidthMode ?? false;

	return (
		<Suspense fallback={<BlogStatic jsonLd={jsonLd} increasedWidthMode={resolvedIncreasedWidthMode}>{children}</BlogStatic>}>
			<BlogDynamic title={title} jsonLd={jsonLd} increasedWidthMode={resolvedIncreasedWidthMode}>{children}</BlogDynamic>
		</Suspense>
	);
};

export default Blog;
