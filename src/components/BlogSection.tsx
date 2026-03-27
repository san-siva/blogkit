'use client';

import { forwardRef, lazy, Suspense } from 'react';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import BlogSectionStatic from '../staticComponents/BlogSectionStatic';
import type { ForwardedReference } from '../dynamicComponents/BlogDynamic';
export type { ForwardedReference };

const BlogSectionDynamic = lazy(
	() => import('../dynamicComponents/BlogSectionDynamic')
);

interface BlogSectionProperties {
	title?: string | ReactElement<HTMLAttributes<HTMLParagraphElement>, 'p'>;
	category?: string;
	children?: ReactNode;
}

const BlogSection = forwardRef<ForwardedReference, BlogSectionProperties>(
	(
		{
			title = '',
			category = '',
			children = null,
		},
		ref
	) => {
		return (
			<Suspense
				fallback={
					<BlogSectionStatic
						title={title}
						category={category}
					>
						{children}
					</BlogSectionStatic>
				}
			>
				<BlogSectionDynamic
					ref={ref}
					title={title}
					category={category}
				>
					{children}
				</BlogSectionDynamic>
			</Suspense>
		);
	}
);

BlogSection.displayName = 'BlogSection';

export default BlogSection;
