import type { ReactNode } from 'react';
import type { Thing, WithContext } from 'schema-dts';
import styles from '../styles/Blog.module.scss';

interface BlogStaticProperties {
	children: ReactNode;
	jsonLd?: WithContext<Thing>;
	increasedWidthMode?: boolean;
	isTocEnabled?: boolean;
}

const BlogStatic = ({ children, jsonLd, increasedWidthMode = false, isTocEnabled = true }: BlogStaticProperties) => {
	return (
		<div
			className={`${styles.blog} ${increasedWidthMode ? styles['blog--increased-width'] : ''} ${
				isTocEnabled ? '' : styles['blog--no-toc']
			}`}
		>

			{jsonLd && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}
			<div className={styles['blog__content']}>{children}</div>
		</div>
	);
};

export default BlogStatic;
