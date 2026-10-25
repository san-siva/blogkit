'use client';

import { type ReactNode, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import ContentToolbar from '../components/ContentToolbar';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useFullscreenModal } from '../hooks/useFullscreenModal';
import TableStatic from '../staticComponents/TableStatic';
import styles from '../styles/Table.module.scss';

interface TableProperties {
	rows?: ReactNode[][];
	headers?: ReactNode[];
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
	fontSize?: string;
}

const normalizeCell = (text: string | null) =>
	(text ?? '').replace(/\s+/g, ' ').trim().replace(/\|/g, '\\|');

const toMarkdownRow = (cells: string[]) => `| ${cells.join(' | ')} |`;

/**
 * Cells are arbitrary ReactNodes, so the copied text is read back from the
 * rendered DOM and formatted as a markdown table. Markdown requires a header
 * row, so a table without one gets an empty one.
 */
const tableToMarkdown = (container: HTMLElement | null) => {
	const rendered = Array.from(
		container?.querySelectorAll<HTMLElement>('[data-table-row]') ?? []
	).map(row => ({
		isHeader: row.dataset.tableRow === 'header',
		cells: Array.from(row.children).map(cell => normalizeCell(cell.textContent)),
	}));
	if (rendered.length === 0) return '';

	const hasHeader = rendered[0].isHeader;
	const columnCount = rendered[0].cells.length;
	const header = hasHeader ? rendered[0].cells : Array(columnCount).fill('');
	const body = hasHeader ? rendered.slice(1) : rendered;

	return [
		toMarkdownRow(header),
		toMarkdownRow(Array(columnCount).fill('---')),
		...body.map(row => toMarkdownRow(row.cells)),
	].join('\n');
};

const Table = ({
	rows = [],
	headers = [],
	hasMarginUp = false,
	hasMarginDown = false,
	fontSize,
}: TableProperties) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const containerReference = useRef<HTMLDivElement>(null);
	const { isCopied, copy } = useCopyToClipboard();

	const closeModal = useCallback(() => setIsExpanded(false), []);
	useFullscreenModal(isExpanded, closeModal);

	const onCopy = () => copy(tableToMarkdown(containerReference.current));

	return (
		<div
			ref={containerReference}
			className={`${styles['table-container']}
				${hasMarginUp ? styles['margin-top--1'] : ''}
				${hasMarginDown ? styles['margin-bottom--2'] : ''}`}
		>
			<ContentToolbar
				className={styles['table-container__toolbar']}
				host={containerReference}
				isExpanded={false}
				isCopied={isCopied}
				onCopy={onCopy}
				onToggleExpand={() => setIsExpanded(true)}
			/>
			<TableStatic
				rows={rows}
				headers={headers}
				fontSize={fontSize}
			/>

			{isExpanded &&
				typeof document !== 'undefined' &&
				createPortal(
					<div
						className={styles['table-modal']}
						onClick={closeModal}
						role="dialog"
						aria-modal="true"
					>
						<div
							className={styles['table-modal__content']}
							onClick={e => e.stopPropagation()}
						>
							<ContentToolbar
								className={styles['table-modal__toolbar']}
								isExpanded={true}
								isCopied={isCopied}
								onCopy={onCopy}
								onToggleExpand={closeModal}
							/>
							<TableStatic rows={rows} headers={headers} fontSize={fontSize} />
						</div>
					</div>,
					document.body
				)}
		</div>
	);
};

export default Table;
