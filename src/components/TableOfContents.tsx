import type { MouseEvent } from 'react';
import TableOfContentsDynamic from '../dynamicComponents/TableOfContentsDynamic';

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
		<TableOfContentsDynamic
			title={title}
			categoryTitles={categoryTitles}
			visibleTitle={visibleTitle}
			onClickCategoryTitle={onClickCategoryTitle}
		/>
	);
};

export default TableOfContents;
