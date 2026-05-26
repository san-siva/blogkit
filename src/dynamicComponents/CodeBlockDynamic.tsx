'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import 'prismjs/themes/prism-tomorrow.css';

const SH = SyntaxHighlighter as any;

import styles from '../styles/CodeBlock.module.scss';

interface Properties {
	hasMarginUp?: boolean;
	hasMarginDown?: boolean;
	language?: string;
	code?: string;
}

const lineNumberStyle = {
	color: '#95a1b1',
	fontSize: '0.9em',
	paddingRight: '1em',
	marginRight: '8px',
};

const CodeBlock = ({
	language = 'javascript',
	code = '',
	hasMarginUp = false,
	hasMarginDown = false,
}: Properties) => {
	const [isCopyMode, setCopyMode] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopyMode(true);
			setTimeout(() => {
				setCopyMode(false);
			}, 1000);
		} catch (error) {
			console.error('Failed to copy:', error);
		}
	};

	useEffect(() => {
		if (!isExpanded) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsExpanded(false);
		};
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', onKey);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', onKey);
		};
	}, [isExpanded]);

	const renderHeader = (expanded: boolean) => (
		<div className={styles['code-block__header']}>
			<div className={styles['code-block__header__title']}>{language}</div>
			<div className={styles['code-block__header__actions']}>
				<div
					className={`${styles['code-block__header__expand']} ${
						expanded ? styles['code-block__header__expand--collapse'] : ''
					}`}
					onClick={() => setIsExpanded(!expanded)}
					role="button"
					aria-label={expanded ? 'Close fullscreen' : 'Expand to fullscreen'}
					title={expanded ? 'Close fullscreen' : 'Expand to fullscreen'}
				/>
				<div
					className={`${styles['code-block__header__copy']} ${
						isCopyMode ? styles['code-block__header__copy--active'] : ''
					}`}
					onClick={copyToClipboard}
					role="button"
					aria-label="Copy code"
					title="Copy code"
				/>
			</div>
		</div>
	);

	const renderHighlighter = () => (
		<SH
			language={language}
			style={dracula}
			showLineNumbers
			lineNumberStyle={lineNumberStyle}
		>
			{code}
		</SH>
	);

	return (
		<div
			className={`${styles['code-block']} ${hasMarginUp ? styles['margin-top--1'] : ''} ${
				hasMarginDown ? styles['margin-bottom--2'] : ''
			}`}
		>
			{renderHeader(false)}
			<div className={styles['code-block__wrapper']}>{renderHighlighter()}</div>

			{isExpanded &&
				typeof document !== 'undefined' &&
				createPortal(
					<div
						className={styles['code-block__modal']}
						onClick={() => setIsExpanded(false)}
						role="dialog"
						aria-modal="true"
					>
						<div
							className={styles['code-block__modal__content']}
							onClick={e => e.stopPropagation()}
						>
							{renderHeader(true)}
							<div className={styles['code-block__modal__wrapper']}>
								{renderHighlighter()}
							</div>
						</div>
					</div>,
					document.body
				)}
		</div>
	);
};

export default CodeBlock;
