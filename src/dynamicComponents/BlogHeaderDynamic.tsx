import { Fragment } from 'react';

import styles from '../styles/BlogHeader.module.scss';

interface BlogProperties {
	title: string[];
	desc: string[];
	isDescCite?: boolean;
}

const renderLineBreaks = (array: string[]) =>
	array.map((element, index, array) => (
		<Fragment key={element}>
			{element}
			{index === array.length - 1 ? null : <br />}
		</Fragment>
	));

const BlogHeader = ({ title, desc, isDescCite = true }: BlogProperties) => (
		<>
			<h1 className={`${styles['blog-header']}`}>{renderLineBreaks(title)}</h1>
			{isDescCite ? (
				<cite className={`${styles['blog-date']}`}>
					{renderLineBreaks(desc)}
				</cite>
			) : (
				<p className={`${styles['blog-date']}`}>{renderLineBreaks(desc)}</p>
			)}
		</>
	);

export default BlogHeader;
