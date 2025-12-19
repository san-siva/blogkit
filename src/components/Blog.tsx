'use client';

import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import BlogStatic from '../staticComponents/BlogStatic';

const BlogDynamic = lazy(() => import('../dynamicComponents/BlogDynamic'));

interface BlogProperties {
	children: ReactNode;
	title?: string;
}

const Blog = ({ children, title = 'In this article' }: BlogProperties) => {
	return (
		<Suspense fallback={<BlogStatic>{children}</BlogStatic>}>
			<BlogDynamic title={title}>{children}</BlogDynamic>
		</Suspense>
	);
};

export default Blog;
