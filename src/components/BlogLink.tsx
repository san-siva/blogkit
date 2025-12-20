import { lazy, Suspense } from 'react';
import BlogLinkStatic from '../staticComponents/BlogLinkStatic';

const BlogLinkDynamic = lazy(
	() => import('../dynamicComponents/BlogLinkDynamic')
);

interface BlogLinkProperties {
	title: string;
	desc?: string;
	isInProgress?: boolean;
	href?: string;
}

const BlogLink = ({
	title = '',
	desc = '',
	isInProgress = false,
	href,
}: BlogLinkProperties) => {
	return (
		<Suspense
			fallback={
				<BlogLinkStatic
					title={title}
					desc={desc}
					isInProgress={isInProgress}
					href={href}
				/>
			}
		>
			<BlogLinkDynamic
				title={title}
				desc={desc}
				isInProgress={isInProgress}
				href={href}
			/>
		</Suspense>
	);
};

export default BlogLink;
