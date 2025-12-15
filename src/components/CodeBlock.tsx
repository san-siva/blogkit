'use client';

import { useState } from 'react';
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

const CodeBlock = ({
	language = 'javascript',
	code = '',
	hasMarginUp = false,
	hasMarginDown = false,
}: Properties) => {
	const [isCopyMode, setCopyMode] = useState(false);

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

	const lineNumberStyle = {
		color: '#95a1b1',
		fontSize: '0.9em',
		paddingRight: '1em',
		marginRight: '8px',
	};

	return (
		<div
			className={`${styles['code-block']} ${hasMarginUp ? styles['margin-top--1'] : ''} ${
				hasMarginDown ? styles['margin-bottom--2'] : ''
			}`}
		>
			<div className={styles['code-block__header']}>
				<div className={styles['code-block__header__title']}>{language}</div>
				<div
					className={`${styles['code-block__header__copy']} ${
						isCopyMode ? styles['code-block__header__copy--active'] : ''
					}`}
					onClick={copyToClipboard}
				/>
			</div>
			<div className={styles['code-block__wrapper']}>
				<SH
					language={language}
					style={dracula}
					showLineNumbers
					lineNumberStyle={lineNumberStyle}
				>
					{code}
				</SH>
			</div>
		</div>
	);
};

export default CodeBlock;
