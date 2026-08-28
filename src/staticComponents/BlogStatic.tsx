import type { ReactNode } from 'react';
import type { Thing, WithContext } from 'schema-dts';
import styles from '../styles/Blog.module.scss';

interface BlogStaticProperties {
	children: ReactNode;
	jsonLd?: WithContext<Thing>;
	increasedWidthMode?: boolean;
}

const BlogStatic = ({ children, jsonLd, increasedWidthMode = false }: BlogStaticProperties) => {
	return (
		<div className={`${styles.blog} ${increasedWidthMode ? styles['blog--increased-width'] : ''}`}>

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
