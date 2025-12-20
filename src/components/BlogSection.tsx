import { forwardRef, lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import BlogSectionStatic from '../staticComponents/BlogSectionStatic';
import type { ForwardedReference } from '../dynamicComponents/BlogDynamic';
export type { ForwardedReference };

const BlogSectionDynamic = lazy(
	() => import('../dynamicComponents/BlogSectionDynamic')
);

interface BlogSectionProperties {
	title?: string;
	category?: string;
	children?: ReactNode;
	increaseMarginBottom?: boolean;
}

const BlogSection = forwardRef<ForwardedReference, BlogSectionProperties>(
	(
		{
			title = '',
			category = '',
			children = null,
			increaseMarginBottom = false,
		},
		ref
	) => {
		return (
			<Suspense
				fallback={
					<BlogSectionStatic
						title={title}
						category={category}
						increaseMarginBottom={increaseMarginBottom}
					>
						{children}
					</BlogSectionStatic>
				}
			>
				<BlogSectionDynamic
					ref={ref}
					title={title}
					category={category}
					increaseMarginBottom={increaseMarginBottom}
				>
					{children}
				</BlogSectionDynamic>
			</Suspense>
		);
	}
);

BlogSection.displayName = 'BlogSection';

export default BlogSection;
