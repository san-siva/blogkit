import type { ReactNode } from 'react';
import styles from '../styles/Blog.module.scss';

interface BlogStaticProperties {
	children: ReactNode;
}

const BlogStatic = ({ children }: BlogStaticProperties) => {
	return (
		<div className={styles.blog}>
			<div className={styles['blog__content']}>{children}</div>
		</div>
	);
};

export default BlogStatic;
