import type { ReactNode } from 'react';
import type { Thing, WithContext } from 'schema-dts';
import styles from '../styles/Blog.module.scss';

interface BlogStaticProperties {
	children: ReactNode;
	jsonLd?: WithContext<Thing>;
}

const BlogStatic = ({ children, jsonLd }: BlogStaticProperties) => {
	return (
		<div className={styles.blog}>
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
