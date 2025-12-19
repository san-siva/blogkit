import type { ReactNode } from 'react';
import styles from '../styles/BlogSection.module.scss';
import { generateIdForBlogTitle } from '../utils';

interface BlogSectionStaticProperties {
	title?: string;
	category?: string;
	children?: ReactNode;
	increaseMarginBottom?: boolean;
}

const BlogSectionStatic = ({
	title = '',
	category = '',
	children = null,
	increaseMarginBottom = false,
}: BlogSectionStaticProperties) => {
	const titleWithCategory = category ? `${category} - ${title}` : title;
	const id = generateIdForBlogTitle(titleWithCategory);

	return (
		<div
			className={`${styles['blog-section']}
				${
					increaseMarginBottom
						? styles['margin-bottom--9']
						: styles['margin-bottom--6']
				}`}
			data-title={title}
			data-id={id}
		>
			{title ? (
				<h4 className={styles['blog-section__title']}>{title}</h4>
			) : null}
			{children}
		</div>
	);
};

export default BlogSectionStatic;
