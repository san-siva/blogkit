import type { MouseEvent } from 'react';

import styles from '../styles/TocNode.module.scss';

export interface TocNode {
	id: string;
	title: string;
	depth: number;
	children: TocNode[];
}

interface TocNodeProperties {
	node: TocNode;
	index: number;
	visibleTitle: string | null;
	onClick: (e: MouseEvent<HTMLParagraphElement>) => void;
}

const TocNode = ({ node, index, visibleTitle, onClick }: TocNodeProperties) => (
	<div>
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
		{node.children.length > 0 && (
			<div
				className={`${styles['toc-node__children']} ${styles[`toc-node__children--${node.depth === 0 ? 'sub' : 'sub-sub'}`]}`}
			>
				{node.children.map((child, i) => (
					<TocNode
						key={child.id}
						node={child}
						index={i}
						visibleTitle={visibleTitle}
						onClick={onClick}
					/>
				))}
			</div>
		)}
	</div>
);

export default TocNode;
