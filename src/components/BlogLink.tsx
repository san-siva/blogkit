'use client';

import { useState } from 'react';

import { animated, useSpring } from '@react-spring/web';

import styles from '../styles/BlogLink.module.scss';

import { generateUrlForBlogTitle } from '../utils';

interface Properties {
	title: string;
	desc?: string;
	isInProgress?: boolean;
}

const DEFAULT_LINE_END = 18;
const DEFAULT_POLYLINE_POINTS = '12 5, 19 12, 12 19';
const MOVED_POLYLINE_POINTS = '15 5, 22 12, 15 19';

const BlogLink = ({ title = '', desc = '', isInProgress = false }: Properties) => {
	const [isHovered, setIsHovered] = useState(false);

	const link = generateUrlForBlogTitle(title);

	const svgColor = useSpring({
		stroke: isHovered ? '#4242fa' : 'transparent',
	});

	const polyLine = useSpring({
		points: isHovered ? MOVED_POLYLINE_POINTS : DEFAULT_POLYLINE_POINTS,
		config: { duration: 200 },
	});

	const lineEnd = useSpring({
		x2: isHovered ? `${DEFAULT_LINE_END + 2}` : `${DEFAULT_LINE_END}`,
		config: { duration: 200 },
	});

	if (isInProgress) return null;

	return (
		<a
			className={styles['blog-link']}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			href={`/blog/${link}`}
			rel="noopener noreferrer"
		>
			<h6 className={styles['blog-link__title']}>{title}</h6>
			<p className={styles['blog-link__description']}>{desc}</p>
			<div className={styles['blog-link__read-more']}>
				<p>Read More</p>
				<animated.svg
					xmlns="http://www.w3.org/2000/svg"
					width="18px"
					height="18px"
					viewBox="0 0 24 24"
					fill="none"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={svgColor as any}
				>
					<animated.line x1="5" y1="12" y2="12" x2={lineEnd.x2 as any}></animated.line>
					<animated.polyline points={polyLine.points as any} />
				</animated.svg>
			</div>
		</a>
	);
};

export default BlogLink;
