import type { MouseEvent } from 'react';

import styles from '../styles/TocNode.module.scss';

export interface TocNode {
	id: string;
	title: string;
	depth: number;
	children: TocNode[];
}

export const containsId = (node: TocNode, id: string | null): boolean =>
	id !== null && (node.id === id || node.children.some(child => containsId(child, id)));

interface TocNodeProperties {
	node: TocNode;
	index: number;
	visibleTitle: string | null;
	onClick: (e: MouseEvent<HTMLParagraphElement>) => void;
	expandOverrides?: Record<string, boolean>;
	onToggle?: (id: string, isExpanded: boolean) => void;
	showToggleColumn?: boolean;
}

const TocNode = ({
	node,
	index,
	visibleTitle,
	onClick,
	expandOverrides = {},
	onToggle,
	showToggleColumn = false,
}: TocNodeProperties) => {
	const hasChildren = node.children.length > 0;
	const isCollapsible = hasChildren && onToggle !== undefined;
	const isExpanded = isCollapsible
		? (expandOverrides[node.id] ?? containsId(node, visibleTitle))
		: true;
	const childrenShowToggleColumn =
		onToggle !== undefined && node.children.some(child => child.children.length > 0);

	return (
		<div>
			<div className={styles['toc-node__row']}>
				{isCollapsible && (
					<button
						type="button"
						className={`${styles['toc-node__toggle']} ${isExpanded ? styles['toc-node__toggle--expanded'] : ''}`}
						aria-expanded={isExpanded}
						aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${node.title}`}
						onClick={() => onToggle(node.id, isExpanded)}
					>
						<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
							<polyline
								points="9 6 15 12 9 18"
								fill="none"
								stroke="currentColor"
								strokeWidth="3"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				)}
				{showToggleColumn && !isCollapsible && (
					<span className={styles['toc-node__toggle-spacer']} aria-hidden="true" />
				)}
				<p
					data-idx={index}
					data-id={node.id}
					className={[
						styles['toc-node__title'],
						node.id === visibleTitle ? styles['toc-node__title--active'] : '',
						node.depth === 1 ? styles['toc-node__title--sub'] : '',
						node.depth === 2 ? styles['toc-node__title--sub-sub'] : '',
					].join(' ')}
					onClick={onClick}
				>
					{node.title}
				</p>
			</div>
			{hasChildren && isExpanded && (
				<div className={styles['toc-node__children']}>
					{node.children.map((child, i) => (
						<TocNode
							key={`${node.id}-${child.id}`}
							node={child}
							index={i}
							visibleTitle={visibleTitle}
							onClick={onClick}
							expandOverrides={expandOverrides}
							onToggle={onToggle}
							showToggleColumn={childrenShowToggleColumn}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default TocNode;
