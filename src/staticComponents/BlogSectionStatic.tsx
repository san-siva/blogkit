import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import styles from '../styles/BlogSection.module.scss';
import { generateIdForBlogTitle } from '../utils';

interface BlogSectionStaticProperties {
	title?: string | ReactElement<HTMLAttributes<HTMLParagraphElement>, 'p'>;
	category?: string;
	children?: ReactNode;
}

const BlogSectionStatic = ({
	title = '',
	category = '',
	children = null,
}: BlogSectionStaticProperties) => {
	const titleString = typeof title === 'string' ? title : '';
	const titleWithCategory = category ? `${category} - ${titleString}` : titleString;
	const id = generateIdForBlogTitle(titleWithCategory);

	return (
		<div className={styles['blog-section']} data-title={titleString} data-id={id}>
			{title ? (
				<h3 className={styles['blog-section__title']}>{title}</h3>
			) : null}
			{children}
		</div>
	);
};

export default BlogSectionStatic;
