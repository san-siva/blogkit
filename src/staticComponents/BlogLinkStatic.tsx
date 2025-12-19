import styles from '../styles/BlogLink.module.scss';
import { generateUrlForBlogTitle } from '../utils';

interface Properties {
	title: string;
	desc?: string;
	isInProgress?: boolean;
	href?: string;
}

const BlogLinkStatic = ({ title = '', desc = '', isInProgress = false, href }: Properties) => {
	const link = href || `/blog/${generateUrlForBlogTitle(title)}`;

	if (isInProgress) return null;

	return (
		<a
			className={styles['blog-link']}
			href={link}
			rel="noopener noreferrer"
		>
			<h6 className={styles['blog-link__title']}>{title}</h6>
			<p className={styles['blog-link__description']}>{desc}</p>
			<div className={styles['blog-link__read-more']}>
				<p>Read More</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18px"
					height="18px"
					viewBox="0 0 24 24"
					fill="none"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					stroke="transparent"
				>
					<line x1="5" y1="12" y2="12" x2="18"></line>
					<polyline points="12 5, 19 12, 12 19" />
				</svg>
			</div>
		</a>
	);
};

export default BlogLinkStatic;
