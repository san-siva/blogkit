'use client';

import { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import 'prismjs/themes/prism-tomorrow.css';

const SH = SyntaxHighlighter as any;

import ContentToolbar from '../components/ContentToolbar';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useFullscreenModal } from '../hooks/useFullscreenModal';
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

// the dracula theme sets an inline margin on <pre>, which css can't override
const preStyle = {
	margin: 0,
};

const CodeBlock = ({
	language = 'javascript',
	code = '',
	hasMarginUp = false,
	hasMarginDown = false,
}: Properties) => {
	const hostReference = useRef<HTMLDivElement>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const { isCopied, copy } = useCopyToClipboard();

	const closeModal = useCallback(() => setIsExpanded(false), []);
	useFullscreenModal(isExpanded, closeModal);

	const renderHeader = () => (
		<div className={styles['code-block__header']}>
			<div className={styles['code-block__header__title']}>{language}</div>
		</div>
	);

	const renderHighlighter = () => (
		<SH
			language={language}
			style={dracula}
			showLineNumbers
			lineNumberStyle={lineNumberStyle}
			customStyle={preStyle}
		>
			{code}
		</SH>
	);

	return (
		<div
			ref={hostReference}
			className={`${styles['code-block']} ${hasMarginUp ? styles['margin-top--1'] : ''} ${
				hasMarginDown ? styles['margin-bottom--2'] : ''
			}`}
		>
			<ContentToolbar
				className={styles['code-block__toolbar']}
				host={hostReference}
				isExpanded={false}
				isCopied={isCopied}
				onCopy={() => copy(code)}
				onToggleExpand={() => setIsExpanded(true)}
			/>
			{renderHeader()}
			<div className={styles['code-block__wrapper']}>{renderHighlighter()}</div>

			{isExpanded &&
				typeof document !== 'undefined' &&
				createPortal(
					<div
						className={styles['code-block__modal']}
						onClick={closeModal}
						role="dialog"
						aria-modal="true"
					>
						<div
							className={styles['code-block__modal__content']}
							onClick={e => e.stopPropagation()}
						>
							<ContentToolbar
								className={styles['code-block__modal__toolbar']}
								isExpanded={true}
								isCopied={isCopied}
								onCopy={() => copy(code)}
								onToggleExpand={closeModal}
							/>
							{renderHeader()}
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
