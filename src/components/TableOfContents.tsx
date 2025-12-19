'use client';

import type { MouseEvent } from 'react';
import styles from '../styles/Blog.module.scss';

interface CategoryTitleValue {
	el: HTMLElement;
	title: string;
	lastUpdatedAt: number;
	isSubSection: boolean;
}

type CategoryTitle = Map<string, CategoryTitleValue>;

interface TableOfContentsProperties {
	title?: string;
	categoryTitles: CategoryTitle;
	visibleTitle: string | null;
	onClickCategoryTitle: (error: MouseEvent<HTMLParagraphElement>) => void;
}

const TableOfContents = ({
	title = 'In this article',
	categoryTitles,
	visibleTitle,
	onClickCategoryTitle,
}: TableOfContentsProperties) => {
	return (
		<div className={styles['blog__sidebar']}>
			<p
				className={`${styles['margin-bottom--3']} ${styles['category__header']}`}
			>
				{title}
			</p>
			{[...categoryTitles].map(
				([id, { title, isSubSection }], index, array) => {
					const isNextSectionSubSection = array[index + 1]?.[1]?.isSubSection;
					return (
						<p
							key={id}
							data-idx={index}
							data-id={id}
							className={`${styles['category__title']} ${
								id === visibleTitle ? styles['category__title--active'] : ''
							} ${isSubSection ? styles['category__title--sub'] : ''} ${
								isSubSection && !isNextSectionSubSection
									? styles['margin-bottom-imp--2']
									: ''
							}`}
							onClick={onClickCategoryTitle}
						>
							{title}
						</p>
					);
				}
			)}
		</div>
	);
};

export default TableOfContents;
