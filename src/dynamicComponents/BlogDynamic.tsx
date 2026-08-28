'use client';

import {
	Children,
	cloneElement,
	isValidElement,
	useState,
} from 'react';
import { useSpring, animated, config } from '@react-spring/web';

import type { ReactNode, RefAttributes } from 'react';
import type { Thing, WithContext } from 'schema-dts';

import styles from '../styles/Blog.module.scss';
import { useCategoryTitles } from '../hooks/useCategoryTitles';
import { useSectionObserver } from '../hooks/useSectionObserver';
import type { CategoryTitleValue } from '../hooks/useCategoryTitles';
import TocNodeStatic from '../staticComponents/TocNodeStatic';
import type { TocNode } from '../staticComponents/TocNodeStatic';

interface BlogProperties {
	children: ReactNode;
	title?: string;
	jsonLd?: WithContext<Thing>;
	increasedWidthMode?: boolean;
}

export interface ForwardedReference {
	parentRef: HTMLDivElement;
	childRefs: ForwardedReference[];
}

const MAX_TOC_DEPTH = 2;

const buildTocTree = (entries: [string, CategoryTitleValue][]): TocNode[] => {
	const roots: TocNode[] = [];
	const stack: TocNode[] = [];
	for (const [id, { title, depth }] of entries.filter(([, { depth }]) => depth <= MAX_TOC_DEPTH)) {
		const node: TocNode = { id, title, depth, children: [] };
		while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
			stack.pop();
		}
		if (stack.length === 0) {
			roots.push(node);
		} else {
			stack[stack.length - 1].children.push(node);
		}
		stack.push(node);
	}
	return roots;
};

const Blog = ({
	children,
	title = 'In this article',
	jsonLd,
	increasedWidthMode = false,
}: BlogProperties) => {
	const [visibleTitle, setVisibleTitle] = useState<string | null>(null);
	const [showTOC, setShowTOC] = useState(false);

	const { categoryTitles, handleSectionReference } = useCategoryTitles({
		visibleTitle,
		setVisibleTitle,
		setShowTOC,
	});

	const { handleClickCategoryTitle } = useSectionObserver({
		categoryTitles,
		setVisibleTitle,
	});

	const sidebarStyle = useSpring({
		opacity: showTOC ? 1 : 0,
		transform: showTOC ? 'translateX(0)' : 'translateX(40px)',
		config: config.gentle,
	});

	return (
		<div className={`${styles.blog} ${increasedWidthMode ? styles['blog--increased-width'] : ''}`}>
			{jsonLd && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}
			<div className={styles['blog__content']}>
				{Children.map(children, child => {
					if (!isValidElement(child)) return child;
					return cloneElement(child, {
						ref: handleSectionReference,
					} as RefAttributes<ForwardedReference>);
				})}
			</div>
			<animated.div className={styles['blog__sidebar']} style={sidebarStyle}>
				<p
					className={`${styles['margin-bottom--3']} ${styles['category__header']}`}
				>
					{title}
				</p>
				{buildTocTree([...categoryTitles]).map((node, i) => (
					<TocNodeStatic
						key={node.id}
						node={node}
						index={i}
						visibleTitle={visibleTitle}
						onClick={handleClickCategoryTitle}
					/>
				))}
			</animated.div>
		</div>
	);
};

export default Blog;
