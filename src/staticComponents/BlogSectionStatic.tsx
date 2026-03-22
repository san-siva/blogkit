import type { ReactNode } from 'react';
import styles from '../styles/BlogSection.module.scss';
import { generateIdForBlogTitle } from '../utils';

interface BlogSectionStaticProperties {
	title?: string;
	category?: string;
	children?: ReactNode;
}

const BlogSectionStatic = ({
	title = '',
	category = '',
	children = null,
}: BlogSectionStaticProperties) => {
	const titleWithCategory = category ? `${category} - ${title}` : title;
	const id = generateIdForBlogTitle(titleWithCategory);

	return (
		<div className={styles['blog-section']} data-title={title} data-id={id}>
			{title ? (
				<h3 className={styles['blog-section__title']}>{title}</h3>
			) : null}
			{children}
		</div>
	);
};

export default BlogSectionStatic;
